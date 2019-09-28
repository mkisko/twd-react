import React from 'react';
import './showInfoModal.scss';
import { Modal, Button } from 'antd';

const ShowInfoModal = ({isOpen, closeModal, info, continueLine}) => {
  if (!info) {
    return null;
  }
  const {lineId, layerId, id: addPointId} = info;
  const {name, date, stat, type, category, bandWidth, forecast, fotos, risk, history} = info.info;
  return (
    <div>
      <Modal visible={isOpen} footer={false} onCancel={closeModal}>
        <p>{name}</p>
        <p>Дата учета: {new Date(date).toLocaleDateString()}</p>
        <p>Статус: {stat}</p>
        <p>Тип: {type}</p>
        <p>Категория: {category}</p>
        <p>Пропускная способность: {bandWidth}</p>
        <p>Прогноз: {forecast}</p>
        <div>fotos</div>
        <p>Риск: {risk}</p>
        <ul>
          {history ? history.map(({date, text, performer}) => {
            return (
              <li key={text}>
                <p>{new Date(date).toLocaleDateString()}</p>
                <p>{text}, {performer}</p>
              </li>
            )
          }) : null}
        </ul>

        <Button onClick={() => continueLine(lineId, layerId, addPointId)}>добавить точку</Button>
      </Modal>
    </div>
  );
};

export default ShowInfoModal;