begin;

insert into "SatisfactionQuestion"
  (id, tag_mask, star_mask, type, question) values
  (1, '{"op", "tech"}', '{5}', 'checkbox', 'Добавьте, если хотите:'),
  (2, '{"op"}', '{1,2,3}', 'checkbox', 'Что не устроило?'),
  (3, '{"tech"}', '{1,2,3}', 'checkbox', 'Что не устроило?')
  ;

insert into "SatisfactionAnswer"
  (question_id, answer, free_form) values
  (1, 'Всё отлично, как и ожидалось', false),
  (1, 'Хочу выразить благодарность', false),
  (1, 'Свой вариант ответа', true),

  (2, 'Скорость обработки', false),
  (2, 'Качество ответов', false),
  (2, 'Интонации', false),
  (2, 'Свой вариант ответа', true),

  (3, 'Скорость', false),
  (3, 'Качество', false),
  (3, 'Общение', false),
  (3, 'Свой вариант ответа', true)
  ;

insert into "SatisfactionRequest"
  (id) values ('abc'), ('hello'), ('world');

commit;
