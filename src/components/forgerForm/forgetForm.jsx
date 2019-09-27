import React from 'react';
import {Form, Icon, Input, Button, Typography, Divider} from 'antd';
import {Container} from "../../utils/styledComponents";

// TODO: подключить апи

class ForgetForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.history.push('/login');
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
              rules: [{required: true, message: 'Введите email!'}, {
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Некорректный адрес'
              }],
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="Почтовый адрес при регистрации"
              />,
            )}
          </Form.Item>
          <Typography>На указанный адрес будет отправлено письмо с паролем</Typography>
          <Divider />
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Восстановить
            </Button>
          </Form.Item>
        </Form>
      </Container>
    );
  }
}

const WrappedForm = Form.create({name: 'forget_form'})(ForgetForm);

export default WrappedForm;