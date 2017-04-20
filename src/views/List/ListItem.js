import React from 'react'
import { autobind } from 'core-decorators'

@autobind
class ListItem extends React.Component {
  render() {
    return (
      <div className="box">
        <article className="media">
          <div className="media-content">
            <div className="content">
              <p>
                <strong>page1</strong>
                <br />
                page1 description
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <a className="level-item">
                  <span className="icon is-small"><i className="fa fa-reply"></i></span>
                </a>
                <a className="level-item">
                  <span className="icon is-small"><i className="fa fa-retweet"></i></span>
                </a>
                <a className="level-item">
                  <span className="icon is-small"><i className="fa fa-heart"></i></span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    )
  }
}
export default ListItem
