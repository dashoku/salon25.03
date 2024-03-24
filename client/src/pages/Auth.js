// Auth.js
import React, { useContext, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from '../utils/consts';
import { registration, login } from '../http/userAPI'; // Обновлен импорт
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import './stylepages.css';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setFirstName] = useState('');
  const [surname, setLastName] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [isAuth, setIsAuth] = useState(false); // Добавлено состояние для авторизации

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password, name, surname, phone);
      }
      user.setUser(data);
      setIsAuth(true);
      navigate(HOME_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };


  return (
    <Container className="auth-container">
      <h3 className="auth-title">{isLogin ? 'Авторизация' : 'Регистрация'}</h3>
      <Card className="auth-card">
        <h7 className="auth-title">Введите Email и Пароль</h7>
        <Form className="auth-form">
          <Form.Control
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="auth-input"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {!isLogin && (
            <>
              <Form.Control
                className="auth-input"
                placeholder="Имя"
                value={name}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Form.Control
                className="auth-input"
                placeholder="Фамилия"
                value={surname}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Form.Control
                className="auth-input"
                placeholder="Номер телефона"
                value={phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </>
          )}
          <Row className="auth-links">
            {isLogin ? (
              <div>
                Немає акаунта? <NavLink to={REGISTRATION_ROUTE}>Зареєструйтеся!</NavLink>
              </div>
            ) : (
              <div>
                Є акаунт? <NavLink to={LOGIN_ROUTE}>Увійдіть!</NavLink>
              </div>
            )}
            <Button className="auth-button" onClick={click}>
              {isLogin ? 'Увійти' : 'Зареєструватися'}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
