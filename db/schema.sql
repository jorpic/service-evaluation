begin;

drop table if exists "SatisfactionResponse";
drop table if exists "SatisfactionRequest";
drop table if exists "SatisfactionAnswer";
drop table if exists "SatisfactionQuestion";
drop type if exists "SatisfactionQuestionType";


create type "SatisfactionQuestionType" as enum ('checkbox', 'radiobutton');

create table "SatisfactionQuestion"
  ( id serial primary key
  , type "SatisfactionQuestionType" not null
  , star_mask int4[] not null default array[]::int4[]
  , question text not null
  , ord int not null
  );

create table "SatisfactionAnswer"
  ( id serial primary key
  , question_id int4 not null references "SatisfactionQuestion"
  , icon text
  , answer text not null
  , value int4 not null
  , free_form boolean not null default false
  , ord int not null
  );

create table "SatisfactionRequest"
  ( id text primary key
  , ctime timestamptz not null default now()
  -- client & case details
  );

create table "SatisfactionResponse"
  ( id serial primary key
  , ctime timestamptz not null default now()
  , request_id text not null references "SatisfactionRequest"
  , response json not null
  );

create index on "SatisfactionResponse"(request_id);


create or replace function
  satisfaction_questions_as_json() returns json
as $$
  select json_agg(r.question)
    from (
      select
        json_build_object(
          'id', q.id,
          'type', q.type,
          'question', q.question,
          'starMask', q.star_mask,
          'answers',
          json_agg(json_build_object(
            'id', a.id,
            'value', a.value,
            'text', a.answer,
            'isFreeForm', a.free_form) order by a.value)
        ) as  question
      from "SatisfactionQuestion" q, "SatisfactionAnswer" a
      where q.id = a.question_id
      group by q.id) r;
$$ language sql volatile;


create or replace function
  satisfaction_get_all_data(_key text) returns json
as $$
  with xxx(requestHasExpired, answers)  as (
    select rq.ctime < now() - interval '5 days', rs.response
      from "SatisfactionRequest" rq
        left outer join "SatisfactionResponse" rs
        on (rq.id = rs.request_id)
      where rq.id = _key
      order by rs.ctime desc
      limit 1)

    select
        case
          when exists(select 1 from xxx) then
            (select json_build_object(
              'questions', satisfaction_questions_as_json(),
              'answers', answers,
              'requestHasExpired', requestHasExpired
            ) from xxx)
          else
            json_build_object('error', 'key is not valid or has expired')
        end
$$ language sql volatile;

commit;
