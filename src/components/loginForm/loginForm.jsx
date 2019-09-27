import React from 'react';
import {Form, Icon, Input, Button, Checkbox, Divider} from 'antd';
import {Link} from 'react-router-dom';
import './loginForm.scss';
import {Container} from "../../utils/styledComponents";

// TODO: подключить апи
// TODO: если успешно то сохраняем апикей
// TODO: если нет то выводим ошибки

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.form.resetFields(['username', 'password']);
        this.props.auth(true);
        // this.props.form.setFields({
        //   username: {
        //     value: values.username,
        //     errors: [new Error('Такого email нет в базе')],
        //   },
        // });
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              initialValue: '',
              rules: [{required: true, message: 'Введите email!'}, {
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Некорректный адрес'
              }],
            })(
              <Input
                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="Имя пользователя"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              initialValue: '',
              rules: [{required: true, message: 'Введите пароль!'}, {min: 6, message: 'Не менее 6 символов'}],
            })(
              <Input
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password"
                placeholder="Пароль"
              />,
            )}
          </Form.Item>
          <Divider />
          <Form.Item>
            {/*{getFieldDecorator('remember', {*/}
            {/*  valuePropName: 'checked',*/}
            {/*  initialValue: true,*/}
            {/*})(<Checkbox>Remember me</Checkbox>)}*/}
            <Link className="login-form-forgot" to="/forget">
              Восстановить пароль
            </Link>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft: '20px'}}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Container>
    );
  }
}

const WrappedLoginForm = Form.create({name: 'login_form'})(LoginForm);

export default WrappedLoginForm;