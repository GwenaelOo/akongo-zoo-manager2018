import React from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import ArticleWidget from './ArticleWidget';

class ArticlesList extends React.Component {

    componentDidMount() {

    }

    render() {
        let articles = this.props.articlesList;

        const list = [];

        for (let article in articles) {

            console.log(articles[article].articleId)

            let articleData = {
                articleId: articles[article].articleId,
                articleTitle: articles[article].articleTitle,
                articleCreatedBy: articles[article].articleCreatedBy,
                articleCreationDate: articles[article].articleCreationDate,
                articleStatus: articles[article].articleStatus,
                articleCreatedByNameToDisplay: articles[article].articleCreatedByNameToDisplay 

            };
            list.push(articleData);      
        }

        return (
            <tbody>

                {
                    list.map(function (article) { return <ArticleWidget articleData={article} key={article.articleId} />; })
                }

            </tbody>

        );
    }

}

const styles={
    widgetList:{
        flex: 1,
        display : 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
}

export default ArticlesList;