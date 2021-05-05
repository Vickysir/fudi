import React from 'react'
import { message, Select } from 'antd';
import { APICollectShopList } from '@/pages/api/request';


const { Option } = Select;

let timeout;
let currentValue;

function fetch(type, value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    async function fake() {
        console.log(`type`, type)
        switch (type) {
            case "1": //"Collect"
                {
                    const { data } = await APICollectShopList();
                    console.log(`object`, data)
                    const result = [];
                    data.forEach(r => {
                        result.push({
                            value: r.id,
                            text: r.address,
                        });
                    });
                    callback(result);
                }
                break;

            default: { //"Delivery"
                initService(value, (result) => {
                    const data = [];
                    result.forEach(r => {
                        data.push({
                            value: r.place_id,
                            text: r.description,
                        });
                    });
                    callback(data);
                });
            }
                break;
        }


    }
    timeout = setTimeout(fake, 300);
}
function initService(input, callback) {
    try {
        const google = window.google;
        console.log(`google`, google)



        const displaySuggestions = function (predictions, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK || !predictions) {
                alert(status);
                return;
            }
            console.log(`predictions`, predictions)
            callback(predictions)

        };
        const service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({ input }, displaySuggestions);


    } catch (err) {
        console.log(`map err`, err)
        message.error("map service init error")
    }
}


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
    };

    handleSearch = value => {
        if (value) {
            fetch(this.props.orderType, value, data => this.setState({ data }));
        } else {
            this.setState({ data: [] });
        }
    };

    handleChange = value => {
        this.setState({ value });
        this.props.handleAutoCompeteSelectOnChange(value);
    };

    render() {
        const options = this.state.data.map(d => <Option key={d.value} value={d.value}>{d.text}</Option>);
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
                notFoundContent={null}
                size="large"
            >
                {options}
            </Select>
        );
    }
}


