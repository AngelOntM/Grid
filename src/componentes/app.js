
import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Dropdown } from 'antd';

class OverlayVisible extends React.Component {
    state = {
        visible: false,
    };

    handleMenuClick = (e) => {
        if (e.key === '3') {
            this.setState({ visible: false });
        }
    }

    handleVisibleChange = (flag) => {
        this.setState({ visible: flag });
    }

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">Clicking me will not close the menu.</Menu.Item>
                <Menu.Item key="2">Clicking me will not close the menu also.</Menu.Item>
                <Menu.Item key="3">Clicking me will close the menu</Menu.Item>
            </Menu>
        );
        return (
            <Dropdown overlay={menu}
                onVisibleChange={this.handleVisibleChange}
                visible={this.state.visible}
            >
                <a className="ant-dropdown-link" href="#">
                    Hover me
                </a>
            </Dropdown>
        );
    }
}

export default OverlayVisible;          