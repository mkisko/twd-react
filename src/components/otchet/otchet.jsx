import React, {Component} from 'react';
import './otchet.scss';
import 'leaflet/dist/leaflet.css';
import {Map, TileLayer, Marker, Polyline} from 'react-leaflet';
import L from 'leaflet';
import FilterControl from "../ui/filterControl/filterControl";
import {Layout, Slider, InputNumber, Modal} from "antd";
import otchet, {layers} from '../../utils/otchet';
import {getPointerIcon} from "../map/map";
import axios from '../../utils/axiosConfig';

const {Content} = Layout;


class Otchet extends Component {
  state = {
    slider: {
      budget: [0, 100],
      lifetime: [0, 100],
      social: [0, 100],
      objects: [0, 100],
      period: [0, 100],
    },
    filterState: null
  };

  componentDidMount() {
    axios.get('/short-index')
      .then((response) => response.data)
      .then(data => this.setState({filterState: data}))
      .catch(err => console.log(err));
  }

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
    if (!this.state.filterState) {
      return null;
    }
    // console.log(this.state.slider);
    const activeLayers = this.state.filterState.filter(layer => layer.isActive);
    
    console.log(activeLayers);

    const lines = activeLayers.flatMap(layer => {
      const {color, id, isActive, lines} = layer;
      return lines.map(line => {
        return {...line, color, id};
      })
    });
    const filteredLines = lines.filter(line => {
      const {budget, lifetime, social, objects, period} = line;
      return +budget > +this.state['slider']['budget'][0]
        && +budget < +this.state.slider.budget[1]
        && +lifetime > +this.state.slider.lifetime[0]
        && +lifetime < +this.state.slider.lifetime[1]
        && +social > +this.state.slider.social[0]
        && +social < +this.state.slider.social[1]
        && +objects > +this.state.slider.objects[0]
        && +objects < +this.state.slider.objects[1]
        && +period > +this.state.slider.period[0]
        && +period < +this.state.slider.period[1]
    });
    const dots = filteredLines.map(line => {
      return line.start || line.end;
    });

    const markers = dots.map((dot, idx) => {
      return (
        <Marker key={idx} position={dot} icon={getPointerIcon('warning')}>
        </Marker>)
    });
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
                  max={1000}
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
                  max={1000}
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
          <MapWithFilter slider={this.state.slider} filteredLines={filteredLines} markers={markers}/>
        </Content>

      </>
    );
  }
}

class MapWithFilter extends Component {
  state = {
    lat: 51.53606837416495,
    lng: 46.026490107178695,
    zoom: 14,

    modal: {
      isOpen: false,
      cat: '',
      long: '',
      nodes: '',
      width: '',
      cost: ''
    }
  };

  openModal = (cat,
               long,
               nodes,
               width,
               cost) => {
    const modal = {
      isOpen: true,
      cat,
      long,
      nodes,
      width,
      cost
    };
    this.setState({modal});
  };


  closeModal = () => {
    const modal = {
      isOpen: false,
      cat: '',
      long: '',
      nodes: '',
      width: '',
      cost: ''
    };
    this.setState({modal});
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <>
        <Map className='otchet-map' center={position} zoom={this.state.zoom} maxZoom={17} onClick={(e) => {
          const {latlng} = e;
          const {lat, lng} = latlng;
        }}>
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
            maxZoom='17'
            minZoom='1'
          />

          {this.props.filteredLines.map((line, idx) => {
            const {color, start, end, cat, long, nodes, width, cost} = line;
            return <Polyline key={color + idx} positions={[start, end]} color={color} weight={10}
                             onClick={(e) => this.openModal(cat, long, nodes, width, cost)}/>
          })}

          {this.props.markers}
        </Map>

        <Modal visible={this.state.modal.isOpen} footer={false} onCancel={this.closeModal}>
          <div className='tab-box' style={{padding: '5px 10px', display: 'flex'}}>
            <p className='t-l'>Категория</p>
            <p className='t-r'>{this.state.modal.cat}</p>
          </div>

          <div className='tab-box' style={{padding: '5px 10px', display: 'flex'}}>
            <p className='t-l'>Протяженность</p>
            <p className='t-r'>{this.state.modal.long}</p>
          </div>

          <div className='tab-box' style={{padding: '5px 10px', display: 'flex'}}>
            <p className='t-l'>Количество узлов</p>
            <p className='t-r'>{this.state.modal.nodes}</p>
          </div>

          <div className='tab-box' style={{padding: '5px 10px', display: 'flex'}}>
            <p className='t-l'>Категория</p>
            <p className='t-r'>{this.state.modal.cat}</p>
          </div>

          <div className='tab-box' style={{padding: '5px 10px', display: 'flex'}}>
            <p className='t-l'>Пропускная способность</p>
            <p className='t-r'>{this.state.modal.width}</p>
          </div>

          <div className='tab-box' style={{padding: '5px 10px', display: 'flex'}}>
            <p className='t-l'>Стоимость ремонта</p>
            <p className='t-r'>{this.state.modal.cost}</p>
          </div>
        </Modal>
      </>
    )
  }
}

export default Otchet;