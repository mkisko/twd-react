import React, {useState} from 'react';
import { Modal, Button, Input , Select} from 'antd';

const {Option} = Select;

const CreateNewModal = ({isOpen, closeModal, submit}) => {
  const [form, changeForm] = useState({
    name: '',
    cat: '',
    type: '',
    bandwidth: '',
    status: 'warning'
  });

  const [select, setSelect] = useState('warning');

  const handleChange = (id) => (e) => {
    const {value} = e.target;
    changeForm((prev) => {
      const newState = {...prev};
      newState[id] = value;
      return newState;
    })
  };

  const handleSelect = (value) => {
    setSelect(value);
  };

  const handleSubmit = () => {
    const res = {...form, status: select};
    submit(res);
  };

  return (
    <div>
      <Modal visible={isOpen} footer={false} onCancel={closeModal}>
        <h3>Добавить</h3>
        <Input onChange={handleChange('name')} placeholder="Название" value={form['name']} />
        <Input onChange={handleChange('cat')} placeholder="Категория узла" value={form['cat']}/>
        <Input onChange={handleChange('type')} placeholder="Тип" value={form['type']}/>
        <Input onChange={handleChange('bandwidth')} placeholder="Пропускная способность" value={form['bandwidth']}/>

        <Select
          style={{display: 'block', width: '200px'}}
          placeholder="Выберите статус объекта"
          onChange={handleSelect}
          value={select}
        >
          <Option value="warning">warning</Option>
          <Option value="danger">danger</Option>
          <Option value="success">success</Option>
        </Select>
        <Button type='button' onClick={handleSubmit}>Добавить маркер</Button>
      </Modal>


    </div>
  );    
};

export default CreateNewModal;