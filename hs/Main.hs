
module Main where

import           Control.Monad.IO.Class (liftIO)
import qualified Data.Aeson as Aeson
import qualified Data.Configurator as Config
import           Data.Text (Text)
import qualified Data.Text as T
import qualified System.Environment as Env
import           System.IO (hPutStrLn, stderr)
import           Text.InterpolatedString.QM (qm, qn)

import           Data.Pool (Pool, createPool, withResource)
import qualified Database.PostgreSQL.Simple as PG
import           Web.Scotty


data AppContext = AppContext
  { pgPool :: Pool PG.Connection
  , frontDir :: FilePath
  }


main :: IO ()
main = Env.getArgs >>= \case
  [configPath] -> main' configPath
  _ -> do
    prog <- Env.getProgName
    hPutStrLn stderr [qm| Usage: {prog} <config.conf> |]


main' :: FilePath -> IO ()
main' configPath = do
  conf <- Config.load [Config.Required configPath]
  pgUri <- Config.require conf "pg.uri"
  httpPort <- Config.require conf "http.port"

  cxt <- AppContext
    <$> createPool (PG.connectPostgreSQL pgUri) PG.close
      1   -- number of distinct sub-pools
      200 -- seconds unused resource kept open
      5   -- maximum number of resources to keep open
    <*> Config.require conf "frontend.dir"

  scotty httpPort $ server cxt


server :: AppContext -> ScottyM ()
server AppContext{..} = do
  get "/"
    $ file $ frontDir <> "index.html"

  get "/:file"
    $ param "file"
    >>= file . (frontDir <>) . T.unpack . T.replace ".." "-" . T.pack

  get "/api/:key" $ do
    key <- param "key"
    [[res]] <- liftIO $ withResource pgPool $ \c ->
      PG.query c [qn| select satisfaction_get_all_data(?) |] [key :: Text]
    json (res :: Aeson.Value)

  post "/api/:key" $ do
    -- FIXME: double check to prevent database DoS (sending huge json with
    -- invalid key)
    key <- param "key"
    res <- liftIO $ withResource pgPool $ \c ->
      PG.query c [qn|
        insert into "SatisfactionResponse" (response)
          select ?
            from "SatisfactionRequest" rq
            where rq.id = ?
              and rq.ctime > now() - interval '5 days'
              and (select count(*) from "SatisfactionResponse" rs where rs.question_id = ?) < 10
          returning (id)
        |] [key :: Text]
    -- FIXME: return meaningful error message
    json (res :: [[Int]])
