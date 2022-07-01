import { Button, Col, Input, Modal, Row, Table, Dropdown, Menu, Checkbox } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import '../componentes.css'
import ReactDragListView from "react-drag-listview";
import { UnorderedListOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';


const urlApi = ' http://127.0.0.1:4444/mascota';

function Grid() {
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false);
    const [editMenu, setEditMenu] = useState(null);
    const [nombre, setNombre] = useState("")
    const [ORD, setORD] = useState("MAS_NOMBRE")
    const [BY, setBY] = useState("ASC")
    const [deleteMany, setDeleteMany] = useState(true)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])



    useEffect(() => {
        traerTabla()
    }, [nombre, BY])

    const traerTabla = async () => {
        axios.post(urlApi, { MAS_NOMBRE: nombre, ORDER: ORD, BY: BY }, {

            "headers": {

                "content-type": "application/json",

            },

        }).then((response) => {
            setData(response.data)
        }
        ).catch(error => {
            console.log(error);
        })
    }
    const onDelete = (record) => {
        Modal.confirm({
            title: 'Estás seguro que deseas eliminar este registro?',
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: () => {
                axios.delete(urlApi + "/" + record.MAS_NUMCTRL).then((response) => {
                    traerTabla()
                })
            }
        })
    }

    const deleteManySelected = () => {
        selectedRowKeys.forEach((key) => {
            axios.delete(urlApi + "/" + key.MAS_NUMCTRL).then((response) => {
                traerTabla()
            })
        })
        setDeleteMany(true)
    }

    const onUpdateRegister = () => {
        Modal.confirm({
            title: 'Estás seguro que deseas actualizar este registro?',
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: () => {
                const data = { MAS_NOMBRE: editMenu?.MAS_NOMBRE }
                console.log(data)
                axios.put(urlApi + "/" + editMenu?.MAS_NUMCTRL, data).then((response) => {
                    traerTabla()
                })
            }
        })
    }

    const [columns, setColumns] = useState([
        {
            orden: 1,
            title: <span className="dragHandler">Mascota</span>,
            dataIndex: 'MAS_NOMBRE',
            key: 'MAS_NOMBRE',
            sorter: (a, b) => a.MAS_NOMBRE.localeCompare(b.MAS_NOMBRE),
            visible: true
        },
        {
            orden: 2,
            title: <span className="dragHandler">Propietario</span>,
            dataIndex: 'PRO_NOMBRE',
            key: 'PRO_NOMBRE',
            sorter: (a, b) => a.PRO_NOMBRE.localeCompare(b.PRO_NOMBRE),
            visible: true
        },
        {
            orden: 3,
            title: <span className="dragHandler">Fecha de nacimiento</span>,
            dataIndex: 'MAS_FECHANAC',
            key: 'MAS_FECHANAC',
            sorter: (a, b) => a.MAS_FECHANAC.localeCompare(b.MAS_FECHANAC),
            visible: true
        },
        {
            orden: 4,
            title: <span className="dragHandler">Raza</span>,
            dataIndex: 'MAS_RAZA',
            key: 'MAS_RAZA',
            sorter: (a, b) => a.MAS_RAZA.localeCompare(b.MAS_RAZA),
            visible: true
        },
        {
            orden: 5,
            title: <span className="dragHandler">Sexo</span>,
            dataIndex: 'MAS_SEXO',
            key: 'MAS_SEXO',
            sorter: (a, b) => a.MAS_SEXO.localeCompare(b.MAS_SEXO),
            visible: true
        },
        {
            orden: 6,
            title: <span className="dragHandler">Accion</span>,
            key: 'ASU',
            dataIndex: 'ASU',
            width: '10%',
            render: (record) => {
                return <>
                    <div>
                        <EditOutlined onClick={() => {
                            setEdit(true)
                            setEditMenu({ ...record })
                        }} style={{ color: "orange" }} />
                        <DeleteOutlined onClick={() => {
                            onDelete(record)
                        }} style={{
                            color: "red",
                            marginLeft: 50
                        }} />
                    </div>
                </>
            },
            visible: true
        }
    ]);

    const [columns1, setColumns1] = useState(columns.filter(column => column.visible))

    const changeData = () => {
        data.forEach(v => {
            v.key = v.MAS_NUMCTRL
            v.MAS_FECHANAC = new Date(v.MAS_FECHANAC).toLocaleDateString()
        })
    }

    changeData()

    const rowSelection = {
        selectedRows: selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRows)
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            if (selectedRows.length > 0) {
                setDeleteMany(false)
            }
            else {
                setDeleteMany(true)
            }
        }
    };

    const ordenar = () => {
        if (BY === "ASC") {
            setBY("DESC")
        }
        else {
            setBY("ASC")
        }
    }

    const OnDragEnd = (fromIndex, toIndex) => {
        const columnsCopy = columns1.slice();
        const item = columnsCopy.splice(fromIndex - 1, 1)[0];
        columnsCopy.splice(toIndex - 1, 0, item);
        setColumns1(columnsCopy);
    };

    const onClick = ({ key }) => {
        const newColumns = columns
        for (var i = 0; i < newColumns.length; i++) {
            console.log(newColumns[i].dataIndex)
            if (newColumns[i].dataIndex === key) {
                newColumns[i].visible = !newColumns[i].visible;
            }
        }
        console.log(newColumns)
        setColumns1(newColumns.filter(column => column.visible));
    };

    const menu = (
        <Menu
            onClick={onClick}
            items={[
                {
                    key: 'MAS_NOMBRE',
                    label: (<Checkbox defaultChecked={true}>Mascota</Checkbox>)
                },
                {
                    key: 'PRO_NOMBRE',
                    label: (<Checkbox defaultChecked={true}>Propietario</Checkbox>)
                },
                {
                    key: 'MAS_FECHANAC',
                    label: (<Checkbox defaultChecked={true}>Fecha de Nacimiento</Checkbox>)
                },
                {
                    key: 'MAS_RAZA',
                    label: (<Checkbox defaultChecked={true}>Raza</Checkbox>)
                },
                {
                    key: 'MAS_SEXO',
                    label: (<Checkbox defaultChecked={true}>Sexo</Checkbox>)
                },
            ]}
        />
    );

    return (

        <div >
            <Row>
                <Col span={6} style={{ padding: 5 }}>
                    <Input value={nombre} placeholder="Nombre" onChange={(x) => {
                        setNombre(x.target.value)
                    }} />
                </Col>
                <Col span={16} style={{ padding: 5 }}>
                    <Button type="danger" htmlType="submit" onClick={() => {
                        setNombre("")
                        setBY("ASC")
                    }}>
                        Limpiar Filtros
                    </Button>
                </Col>
                <Col span={1} >
                    <Button type="danger" disabled={deleteMany} onClick={() => {
                        deleteManySelected()
                    }}>
                        <DeleteOutlined />
                    </Button>
                </Col>
                <Col span={1}>
                    <Dropdown overlay={menu} placement="bottomLeft">
                        <Button><UnorderedListOutlined style={{ fontSize: '16px', color: '#08c' }} /></Button>
                    </Dropdown>
                </Col>
            </Row><br></br>
            <ReactDragListView.DragColumn onDragEnd={OnDragEnd} nodeSelector="th">
                <Table
                    showHeader={true}
                    rowSelection={{ type: 'checkbox', ...rowSelection, }}
                    columns={columns1}
                    dataSource={data}
                    bordered
                    size="middle"
                />
            </ReactDragListView.DragColumn>
            <Modal title="Editar mascota" okText="Actualizar" cancelText="Regresar" visible={edit} onCancel={() => {
                setEdit(false)
            }} onOk={() => {
                onUpdateRegister()
                setEdit(false)
            }}>
                <label>Nombre</label>
                <Input value={editMenu?.MAS_NOMBRE} required={true} onChange={(x) => {
                    setEditMenu((pre) => {
                        return { ...pre, MAS_NOMBRE: x.target.value }
                    })
                }} /><br></br><br></br>
            </Modal>
        </div>
    )

}
export default Grid;