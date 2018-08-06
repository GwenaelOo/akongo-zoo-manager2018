import React from 'react';
import { Router, Route, Link, History, withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap'

class ArticleWidget extends React.Component {

    render() {
        return (
           
            <tr>
            <td>
            <Link to={{
                        pathname: "BlogPost",
                        state: { articleId: this.props.articleData.articleId }
                    }}>
                <a href="">{this.props.articleData.articleTitle}</a>
                </Link>
            </td>
            <td>
                <a href="">Keith Gutierrez</a>
            </td>
            <td>
                <a className="mr-2" href="">HTML5</a>
                <a href="">JAVASCRIPT</a>
            </td>
            <td>
                <a className="mr-1 badge badge-primary" href="">angularjs</a>
                <a className="mr-1 badge badge-primary" href="">mvc</a>
            </td>
            <td>10/05/2015</td>
            <td>10/05/2015</td>
            <td>1251</td>
            <td>
                <a className="mr-1 badge badge-success" href="">Public</a>
            </td>
        </tr>
        );
    }
}

export default ArticleWidget;




