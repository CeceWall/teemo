/* eslint-disable jsx-a11y/click-events-have-key-events,
                  jsx-a11y/no-noninteractive-element-interactions
*/
import React from 'react';
import { Button } from 'antd';
import Deletable from './Deletable';
import './VisualContent.scss';

class VisualContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      showedBar: '',
    };
    this.onAddImage = this.onAddImage.bind(this);
    this.onHideActionBar = this.onHideActionBar.bind(this);
    this.onShowActionBar = this.onShowActionBar.bind(this);
    this.onChooseImage = this.onChooseImage.bind(this);
  }

  onShowActionBar(key) {
    this.setState({
      showedBar: key,
    });
  }

  onChooseImage(event) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      this.img.src = e.target.result;
    };
    console.log(file, this);
  }

  onHideActionBar() {
    this.setState({
      showedBar: '',
    });
  }

  onAddImage() {
    let { contents } = this.state;
    contents = [...contents, {
      type: 'image',
      data: '',
    }];
    this.setState({
      contents,
    });
  }

  getActionBar(key) {
    let inner;
    switch (key) {
      case 'image':
        inner = (
          <div className="add-image-form">
            <input
              type="file"
              accept="image/*"
              style={{ width: 180 }}
              onChange={this.onChooseImage}
            />
            <Button type="primary" htmlType="button" onClick={this.onAddImage}>确定</Button>
          </div>
        );
        break;
      case 'text':
        break;
      case 'link':
        break;
      default:
        inner = (
          <ul className="actions-list">
            <li title="添加图片" onClick={() => this.onShowActionBar('image')}>
              <i className="fa fa-picture-o fa-lg" aria-hidden="true" />
            </li>
            <li title="添加文本" onClick={() => this.onShowActionBar('text')}>
              <i className="fa fa fa-file-text fa-lg" aria-hidden="true" />
            </li>
            <li title="添加链接" onClick={() => this.onShowActionBar('link')}>
              <i className="fa fa-link fa-lg" aria-hidden="true" />
            </li>
            <li className="action-preview" title="预览">
              <i className="fa fa-window-maximize fa-lg" aria-hidden="true" />
            </li>
          </ul>
        );
        break;
    }
    return (
      <div className="actions-bar">
        {inner}
        <div
          role="button"
          tabIndex="0"
          className="close-bar"
          onClick={this.onHideActionBar}
          style={{ display: key ? 'block' : 'none' }}
        >
          <i className="fa fa-times fa-lg" aria-hidden="true" />
        </div>
      </div>
    );
  }


  render() {
    const { showedBar } = this.state;
    return (
      <div className="visual-content-component">
        {this.getActionBar(showedBar)}
        <div className="content">
          <Deletable>
            <img
              alt="11"
              ref={(img) => {
                this.img = img;
              }}
            />
          </Deletable>
        </div>
      </div>
    );
  }
}

export default VisualContent;
