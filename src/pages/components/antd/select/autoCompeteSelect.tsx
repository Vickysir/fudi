import React from 'react'
import { Select, Spin } from 'antd';
import { fetchPlacees } from '../../map/placeService';


const { Option } = Select;


interface Props {
    placeholder: string
    style: any
    orderType: string
    handleAutoCompeteSelectOnChange: (value) => void
}
export class AutoCompeteSelect extends React.Component<Props> {
    state = {
        data: [],
        value: undefined,
        fetching: false
    };

    handleSearch = value => {
        if (value) {
            this.setState({ fetching: true })
            fetchPlacees(this.props.orderType, value, data => this.setState({ data, fetching: false }));
        } else {
            this.setState({ data: [] });
        }
    };

    handleChange = value => {
        this.setState({ value });
        this.props.handleAutoCompeteSelectOnChange(value);
    };

    render() {
        const { fetching } = this.state
        const options = this.state.data.map(d => <Option key={d.value} value={d.value}>{d.label}</Option>);
        return (
            <Select
                showSearch
                value={this.state.value}
                placeholder={this.props.placeholder}
                style={this.props.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                size="large"
            >
                {options}
            </Select>
        );
    }
}


