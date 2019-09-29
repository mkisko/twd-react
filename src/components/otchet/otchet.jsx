import React, {Component} from 'react';
import './otchet.scss';
import 'leaflet/dist/leaflet.css';
import {Map, TileLayer, Marker, Polyline} from 'react-leaflet';
import L from 'leaflet';
import FilterControl from "../ui/filterControl/filterControl";
import {Layout, Slider, InputNumber} from "antd";
import otchet, {layers} from '../../utils/otchet';

const {Content} = Layout;


class Otchet extends Component {
  state = {
    slider: {
      budget: [10, 1000],
      lifetime: [6, 600],
      social: [1, 10000],
      objects: [1, 100],
      period: [2, 120],
    },
    filterState: layers
  };

  onAfterChange = (id) => (value) => {
    this.setState((prev) => {
      const newState = prev.slider;
      newState[id] = value;
      return {slider: newState}
    });
  };

  onChange = (id, range) => (value) => {
    this.setState((prev) => {
      const newState = prev.slider;
      const prevVal = newState[id];
      prevVal[range] = value;
      return {slider: newState}
    });
  };

  changeFilter = (id) => () => {
    this.setState((prevState) => {
      const prevFilterState = prevState.filterState;
      const currentIndex = prevFilterState.findIndex(item => item.id === id);
      const currentObj = prevFilterState[currentIndex];
      currentObj['isActive'] = !currentObj['isActive'];
      const res = [
        ...prevFilterState.slice(0, currentIndex),
        currentObj,
        ...prevFilterState.slice(currentIndex + 1)
      ];
      return {
        filterState: res
      }
    })
  };

  render() {
    // console.log(this.state.slider);
    const activeLayers = this.state.filterState.filter(layer => layer.isActive);

    const lines = activeLayers.flatMap(layer => {
      const {color, id, isActive, lines} = layer;
      return lines.map(line => {
        return {...line, color, id};
      })
    });
    console.log('lines', lines);
    const filteredLines = lines.filter(line => {
      const {budget, lifetime, social, objects, period} = line;
      return budget >= this.state['slider']['budget'][0]
        && budget <= this.state.slider.budget[1]
        && lifetime >= this.state.slider.lifetime[0]
        && lifetime <= this.state.slider.lifetime[1]
        && social >= this.state.slider.social[0]
        && social <= this.state.slider.social[1]
        && objects >= this.state.slider.objects[0]
        && objects <= this.state.slider.objects[1]
        && period >= this.state.slider.period[0]
        && period <= this.state.slider.period[1]
    });
    console.log('filteredLines', filteredLines);
    return (
      <>
        <div className='spravka__header'>
          <ul className='spravka__header__list'>
            {this.state.filterState.map(filter => {
              const {id, isActive, text, lines} = filter;
              const count = lines.length;
              return <FilterControl key={id} isActive={isActive} count={count}
                                    onChange={this.changeFilter(id)}>{text}</FilterControl>
            })}
          </ul>
        </div>
        <Content
          className='content content_second'
        >
          <div className='otchet-filter'>
            <div style={{padding: '50px 40px'}}>
              <p>Бюджет (тыс.рублей)</p>
              <div style={{display: 'flex'}}>
                <InputNumber
                  min={0}
                  style={{marginRight: 5}}
                  value={(this.state.slider['budget'])[0]}
                  onChange={this.onChange('budget', 0)}
                />
                <Slider
                  style={{width: '200px'}}
                  range
                  step={5}
                  defaultValue={this.state.slider['budget']}
                  onAfterChange={this.onAfterChange('budget')}
                />
                <InputNumber
                  min={0}
                  style={{marginLeft: 5}}
                  value={(this.state.slider['budget'])[1]}
                  onChange={this.onChange('budget', 1)}
                />
              </div>
            </div>


            <div style={{padding: '50px 40px'}}>
              <p>Срок службы (мес)</p>
              <div style={{display: 'flex'}}>
                <InputNumber
                  min={0}
                  style={{marginRight: 5}}
                  value={(this.state.slider['lifetime'])[0]}
                  onChange={this.onChange('lifetime', 0)}
                />
                <Slider
                  style={{width: '200px'}}
                  range
                  step={5}
                  defaultValue={this.state.slider['lifetime']}
                  onAfterChange={this.onAfterChange('lifetime')}
                />
                <InputNumber
                  min={0}
                  style={{marginLeft: 5}}
                  value={(this.state.slider['lifetime'])[1]}
                  onChange={this.onChange('lifetime', 1)}
                />
              </div>
            </div>


            <div style={{padding: '50px 40px'}}>
              <p>Социальная значимость (тыс.чел)</p>
              <div style={{display: 'flex'}}>
                <InputNumber
                  min={0}
                  style={{marginRight: 5}}
                  value={(this.state.slider['social'])[0]}
                  onChange={this.onChange('social', 0)}
                />
                <Slider
                  style={{width: '200px'}}
                  range
                  step={5}
                  defaultValue={this.state.slider['social']}
                  onAfterChange={this.onAfterChange('social')}
                />
                <InputNumber
                  min={0}
                  style={{marginLeft: 5}}
                  value={(this.state.slider['social'])[1]}
                  onChange={this.onChange('social', 1)}
                />
              </div>
            </div>


            <div style={{padding: '50px 40px'}}>
              <p>Объекты</p>
              <div style={{display: 'flex'}}>
                <InputNumber
                  min={0}
                  style={{marginRight: 5}}
                  value={(this.state.slider['objects'])[0]}
                  onChange={this.onChange('objects', 0)}
                />
                <Slider
                  style={{width: '200px'}}
                  range
                  step={5}
                  defaultValue={this.state.slider['objects']}
                  onAfterChange={this.onAfterChange('objects')}
                />
                <InputNumber
                  min={0}
                  style={{marginLeft: 5}}
                  value={(this.state.slider['objects'])[1]}
                  onChange={this.onChange('objects', 1)}
                />
              </div>
            </div>


            <div style={{padding: '50px 40px'}}>
              <p>Срок строительства (мес)</p>
              <div style={{display: 'flex'}}>
                <InputNumber
                  min={0}
                  style={{marginRight: 5}}
                  value={(this.state.slider['period'])[0]}
                  onChange={this.onChange('period', 0)}
                />
                <Slider
                  style={{width: '200px'}}
                  range
                  step={5}
                  defaultValue={this.state.slider['period']}
                  onAfterChange={this.onAfterChange('period')}
                />
                <InputNumber
                  min={0}
                  style={{marginLeft: 5}}
                  value={(this.state.slider['period'])[1]}
                  onChange={this.onChange('period', 1)}
                />
              </div>
            </div>

          </div>
          <MapWithFilter filteredLines={filteredLines}/>
        </Content>

      </>
    );
  }
}

class MapWithFilter extends Component {
  state = {
    lat: 51.53606837416495,
    lng: 46.026490107178695,
    zoom: 14
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map className='otchet-map' center={position} zoom={this.state.zoom} maxZoom={17} onClick={(e) => {
        const {latlng} = e;
        const {lat, lng} = latlng;
        console.log(lat, lng);
      }}>
        <TileLayer
          attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
          maxZoom='17'
          minZoom='1'
        />

        {this.props.filteredLines.map((line, idx) => {
          const {color, start, end} = line;
          return <Polyline key={color + idx} positions={[start, end]} color={color} weight={5}/>
        })}
      </Map>
    )
  }
}

export default Otchet;