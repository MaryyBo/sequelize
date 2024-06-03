INSERT INTO users (
    id,
    first_name,
    last_name,
    email,
    password,
    birthday,
    gender,
    created_at,
    updated_at
  )
VALUES (
    id:integer,
    'first_name:character varying',
    'last_name:character varying',
    'email:character varying',
    'password:text',
    'birthday:date',
    'gender:character varying',
    'created_at:timestamp with time zone',
    'updated_at:timestamp with time zone'
  );