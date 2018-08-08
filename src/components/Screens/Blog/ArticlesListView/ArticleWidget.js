import React from 'react';
import { Router, Route, Link, History, withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap'

class ArticleWidget extends React.Component {

    render() {
        const statusDraft = (<a className="mr-1 badge badge-info" href="">{this.props.articleData.articleStatus.fr}</a>);
        const statusProd = (<a className="mr-1 badge badge-success" href="">{this.props.articleData.articleStatus.fr}</a>);

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
                    <a href="">{this.props.articleData.articleCreatedByNameToDisplay}</a>
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
                <td>{this.props.articleData.articleCreationDate}</td>
                <td>1251</td>
                <td>
                    {this.props.articleData.articleStatus.prod ? statusProd : statusDraft}
                </td>
            </tr>
        );
    }
}

export default ArticleWidget;




