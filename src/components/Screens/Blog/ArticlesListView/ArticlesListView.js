import React from 'react';
import ContentWrapper from '../../../Layout/ContentWrapper';
import { Card, CardBody, CardHeader } from 'reactstrap';
import firebase from 'firebase';

import Datatable from '../../../Tables/Datatable';
import ArticlesList from './ArticlesList';

const userData = JSON.parse(localStorage.getItem('user'))

const dtOptions = {
    'paging': true, // Table pagination
    'ordering': true, // Column ordering
    'info': true, // Bottom left status text
    responsive: true,
    // Text translation options
    // Note the required keywords between underscores (e.g _MENU_)
    oLanguage: {
        sSearch: '<em class="fa fa-search"></em>',
        sLengthMenu: '_MENU_ records per page',
        info: 'Showing page _PAGE_ of _PAGES_',
        zeroRecords: 'Nothing found - sorry',
        infoEmpty: 'No records available',
        infoFiltered: '(filtered from _MAX_ total records)',
        oPaginate: {
            sNext: '<em class="fa fa-caret-right"></em>',
            sPrevious: '<em class="fa fa-caret-left"></em>'
        }
    }
}


class ArticlesListView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            articlesList: []
        }
    }

    readArticlesFromDatabase() {

        var self = this;

        let reference = (userData.zooName + '/articlesData/');
        firebase.database().ref(reference).once('value').
            then(function (result) {
                let data = result.val()
                self.setState({
                    articlesList: data
                })
            })
    }

    componentWillMount() {
        this.readArticlesFromDatabase();
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">Articles</div>
                <Card className="card-default">
                    <CardHeader>Blog articles manager</CardHeader>
                    <CardBody>
                        <Datatable options={dtOptions}>
                            <table className="table table-striped my-4 w-100">
                                <thead>
                                    <tr>
                                        <th data-priority="1">Post title</th>
                                        <th>Author</th>
                                        <th>Categories</th>
                                        <th>Tags</th>
                                        <th>Created</th>
                                        <th>Updated</th>
                                        <th>Comments</th>
                                        <th data-priority="2">Status</th>
                                    </tr>
                                </thead>
                                <ArticlesList articlesList={this.state.articlesList} />
                            </table>
                        </Datatable>
                    </CardBody>
                </Card>
            </ContentWrapper>
        );
    }
}
export default ArticlesListView;
