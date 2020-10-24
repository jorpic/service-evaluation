begin;

insert into "SatisfactionQuestion"
  (id, star_mask, type, question) values
  (1, '{1,2,3,4,5}', 'checkbox', 'Как вам наши огурцы?'),
  (2, '{1,2,3}', 'radio', 'Что не понравилось?')
  ;

insert into "SatisfactionAnswer"
  (question_id, value, answer, free_form) values
  (1, 1, 'Офигенно!', false),
  (1, 2, 'Норм', false),
  (1, 3, 'Ну такое', false),
  (1, 4, 'Свой вариант ответа', true),

  (2, 1, 'Слишком длинные', false),
  (2, 2, 'Мало пупырышек', false),
  (2, 3, 'Вялые', false),
  (2, 4, 'Странный цвет', false),
  (2, 5, 'Свой вариант ответа', true)
  ;

insert into "SatisfactionRequest"
  (id) values ('abc'), ('hello'), ('world');

commit;
