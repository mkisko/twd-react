import React, {useState} from 'react';
import {Modal, Button, Input, Select} from 'antd';

const {Option} = Select;

const CreateNewModal = ({isOpen, closeModal, submit, createLineMode, createLine}) => {
  const [form, changeForm] = useState({
    name: '',
    cat: '',
    type: '',
    bandwidth: '',
    status: 'warning'
  });

  const [select, setSelect] = useState('warning');
  const [selectLayer, setSelectLayer] = useState('water');

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

  const handleSelectLayer = (value) => {
    setSelectLayer(value);
  };

  const handleSubmit = () => {
    const res = createLineMode ? {...form, status: select, layer: selectLayer} : {...form, status: select};
    if (createLineMode) {
      createLine(res);
    } else {
      submit(res);
    }
  };

  return (
    <div>
      <Modal visible={isOpen} footer={false} onCancel={closeModal}>
        <h3>Добавить</h3>
        <Input onChange={handleChange('name')} placeholder="Название" value={form['name']}/>
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

        {createLineMode ? <Select
          style={{display: 'block', width: '200px'}}
          placeholder="Выберите слой"
          onChange={handleSelectLayer}
          value={selectLayer}
        >
          <Option value="water">water</Option>
          <Option value="gaz">gaz</Option>
          <Option value="electricity">electricity</Option>
          <Option value="warm">warm</Option>
        </Select> : null}
        <Button type='button' onClick={handleSubmit}>Добавить маркер</Button>
      </Modal>


    </div>
  );
};

export default CreateNewModal;