import { Form, Input, Modal, Button, message, Col, Row } from 'antd';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import '../componentes.css';
import 'antd/dist/antd.min.css';
import { styled } from "@mui/material/styles";
import jake from '../imagenes/jake.jpg'
import '../menuProp.css'

const { Item } = Form;
const urlApi = 'http://127.0.0.1:4444/raza/create'

const FormMAS = () => {
  const key = 'updatable';
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (values) => {
    await axios.post(urlApi, values).then((response) => {
      console.log(response.data);
      message.loading({
        content: 'Ingresando Datos...', duration: 2, key, style: {
          marginTop: '18vh',
        },
      });
      setTimeout(() => {
        message.success({
          content: 'Datos Registrados', key, duration: 2, style: {
            marginTop: '18vh',
          },
        });
      }, 1000);
      window.setTimeout(function () {
        window.location.reload();
      }, 4000);
    }).catch(errorInfo => {
      console.log(errorInfo);
      message.loading({
        content: 'Verificando...', key, style: {
          marginTop: '18vh',
        },
      });
      setTimeout(() => {
        message.error({
          content: 'Por favor verifica que los datos se han llenado de manera correcta!', key, duration: 4, style: {
            marginTop: '18vh',
          },
        });
      }, 1000);
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <a onClick={showModal}>
        <img src={jake} width={50} style={{ float: 'left' }} alt="" />
      </a>
      <Row>
        <Col lg={24}><h1 className='user-type' style={{ marginLeft: 20 }}>Mascota</h1></Col>
      </Row>
      <Modal okButtonProps={{ style: { display: 'none' } }} title="Agregar raza" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="login"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          <Item label='Nombre' name="RAZ_NOMBRE"
            rules={[{
              required: true,
              message: 'Ingresa un nombre'
            }]
            }>
            <Input />
          </Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 4,
            }}
          >
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FormMAS;