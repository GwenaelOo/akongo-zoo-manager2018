import React, { Component } from 'react';
import ContentWrapper from '../../Layout/ContentWrapper';
import { Row, Col, Card, Table, Alert, Button } from 'reactstrap';
// React Select
import Select from 'react-select';
import 'react-select/dist/react-select.css';
// React Draft Wysiwyg
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import swal from 'sweetalert'

import { addNewArticleToDatabase, editArticleInDatabase, deleteArticleFromDatabase } from '../../../database/database'
import moment from 'moment';
import firebase from 'firebase';

import axios from 'axios'

const userData = JSON.parse(localStorage.getItem('user'))

const CATEGORIES = [
    { value: 'enclosure', label: 'enclosure' },
    { value: 'less', label: 'less' },
    { value: 'sass', label: 'sass' },
    { value: 'angularjs', label: 'angularjs' },
    { value: 'node', label: 'node' },
    { value: 'expressJS', label: 'expressJS' }
]
const TAGS = [
    { value: 'JAVASCRIPT', label: 'JAVASCRIPT' },
    { value: 'WEB', label: 'WEB' },
    { value: 'BOOTSTRAP', label: 'BOOTSTRAP' },
    { value: 'SERVER', label: 'SERVER' },
    { value: 'HTML5', label: 'HTML5' },
    { value: 'CSS', label: 'CSS' }
]
const REVIEWERS = [
    { value: 'adam@email.com', label: 'adam@email.com' },
    { value: 'amalie@email.com', label: 'amalie@email.com' },
    { value: 'wladimir@email.com', label: 'wladimir@email.com' },
    { value: 'samantha@email.com', label: 'samantha@email.com' },
    { value: 'estefanía@email.com', label: 'estefanía@email.com' },
    { value: 'natasha@email.com', label: 'natasha@email.com' },
    { value: 'nicole@email.com', label: 'nicole@email.com' },
    { value: 'adrian@email.com', label: 'adrian@email.com' }
]

// editor initial content
const blocksFromHTML = convertFromHTML('<p>Write something...</p>');
const initialEditorContent = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
);


class BlogArticleView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleId: '',
            articleCategories: [],
            articleTags: [],
            articleReviewers: [],
            articleEnclosureList: [],
            editorState: EditorState.createWithContent(initialEditorContent),

            articleTitle: '',
            EditMode: false


        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDraftClick = this.handleDraftClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChangeSelect = (name, newVal) => {
        this.setState({
            [name]: newVal
        });
    }

    handleChange(input) {
        let name = input.target.name
        this.setState({ [name]: input.target.value });
    }

    handleDelete() {

        let articleData = {
            articleId: this.state.articleId,
            articleTitle: this.state.articleTitle
        }

        swal({
            title: "Êtes-vous sûr ?",
            text: "La suppression est irréversible, vous ne serez plus en mesure de récupérer ces données!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui, supprimez tout!",
            closeOnConfirm: false
        },
            function () {
                deleteArticleFromDatabase(articleData)
            });
    }

    handleClick() {

        let blogArticleData = {
            articleId: this.state.articleId,
            articleTitle: this.state.articleTitle,
            articleCategories: this.state.articleCategories,
            articleTags: this.state.articleTags,
            articleReviewer: this.state.articleReviewers,
            articleEnclosureList: this.state.articleEnclosureList,
            articleStatus: {
                prod: true,
                fr: "Production"
            },
            articleContentHTML: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
        }
        
        if (this.state.EditMode === true) {
            editArticleInDatabase(blogArticleData);
        }
        else {
            addNewArticleToDatabase(blogArticleData);
        }
    }

    handleDraftClick() {

        let blogArticleData = {
            articleId: this.state.articleId,
            articleTitle: this.state.articleTitle,
            articleCategories: this.state.articleCategories,
            articleTags: this.state.articleTags,
            articleReviewer: this.state.articleReviewer,
            articleEnclosureList: this.state.articleEnclosureList,
            articleStatus: {
                prod: false,
                fr: "Brouillon"
            },
            articleContentHTML: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
        }
        if (this.state.EditMode === true) {
            editArticleInDatabase(blogArticleData);
        }
        else {
            addNewArticleToDatabase(blogArticleData);
        }
    }

    readServiceFromFirebase(articleId) {
        var self = this
        let reference = (userData.zooName + '/articlesData/' + articleId);

        return firebase.database().ref(reference).once('value').then(function (snapshot) {
            let data = snapshot.val()

            const html = data.articleContentHTML
            let editorState
            if (html) {
                const contentBlock = htmlToDraft(html)
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
                    editorState = EditorState.createWithContent(contentState)
                } else {
                    editorState = EditorState.createEmpty()
                }
            } else {
                editorState = EditorState.createEmpty()
            }

            self.setState({
                articleId: data.articleId || '',
                articleCategories: data.articleCategories || [],
                articleTags: data.articleTags || [],
                articleReviewer: data.articleReviewer || [],
                articleTitle: data.articleTitle || '',
                editorState: editorState,
                EditMode: true,
            });
        })

        this.state.enclosuresList.map(function (enclosure) {
            if (this.enclosure.articleEnclosureList.value === this.state.articleEnclosureList) {

            }
        })
    }

    readEnclosureFromDatabase() {

        var self = this;

        let reference = (userData.zooName + '/enclosuresData/');
        firebase.database().ref(reference).once('value').
            then(function (result) {
                let enclosures = result.val()
                const list = [];

                for (let enclosure in enclosures) {
                    let enclosureData = {
                        label: enclosures[enclosure].enclosureName,
                        value: enclosures[enclosure].enclosureId
                    };
                    list.push(enclosureData);

                }
                self.setState({
                    enclosuresList: list
                })
            })
    }

    onEditorStateChange = editorState => {
        this.setState({ editorState })
    }

    uploadImageCallBack(file) {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgur.com/3/image');
                xhr.setRequestHeader('Authorization', 'Client-ID f1d8a5d1e525584');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }

    componentWillMount() {
        if (this.props.location.state != undefined) {
            this.readServiceFromFirebase(this.props.location.state.articleId);
        }
        this.readEnclosureFromDatabase()
    }

    render() {


        const enclosureListTitle = (<p className="mt-2">Choix de l'enclos</p>);
        const enclosureListChoice = (
            <Select
                name="articleEnclosureList"
                multi
                simpleValue
                value={this.state.articleEnclosureList}
                onChange={this.handleChangeSelect.bind(this, 'articleEnclosureList')}
                options={this.state.enclosuresList}
            />);

        const deleteButton = (
            <div className="float-right">
                <button type="button" className="btn btn-danger" onClick={this.handleDelete}>
                    <em className="fas fa-trash-alt fa-fw"></em>Remove</button>
            </div>

        );

        return (
            <ContentWrapper>
                <div className="content-heading">New Article</div>
                <Alert color="info">
                    <em className="fa fa-exclamation-circle fa-lg fa-fw"></em>
                    <span>There is an autosaved version of this article that is more recent than the version below. <a href="" className="text-white">Restore</a>
                    </span>
                </Alert>
                <Row>
                    { /* Article Content */}
                    <Col lg={9}>
                        <Card body className="card-default">
                            <form action="">
                                <input type="text" name="articleTitle" onChange={this.handleChange} value={this.state.articleTitle} placeholder="Article title..." className="mb-3 form-control form-control-lg" />
                                <Editor
                                    editorState={this.state.editorState}
                                    wrapperClassName="wysiwig-editor-wrapper"
                                    editorClassName="form-control"
                                    editorStyle={{ height: 300 }}
                                    onEditorStateChange={this.onEditorStateChange}
                                    toolbar={{
                                        inline: { inDropdown: true },
                                        list: { inDropdown: true },
                                        textAlign: { inDropdown: true },
                                        link: { inDropdown: true },
                                        history: { inDropdown: true },
                                        image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                                    }}

                                />
                                <br />
                                <p>Notes</p>
                                <textarea cols="6" className="mb-3 form-control"></textarea>
                                <div className="clearfix">
                                    <div className="float-left">
                                        <button type="button" className="btn btn-secondary" onClick={this.handleDraftClick}>
                                            <em className="fa fa-edit fa-fw"></em>Draft</button>
                                        <button type="button" className="btn btn-primary m-t-10" onClick={this.handleClick}>
                                            <em className="fa fa-check fa-fw"></em>Save</button>
                                    </div>
                                    {this.state.EditMode ? deleteButton : null}
                                </div>
                            </form>
                        </Card>
                    </Col>
                    { /* Article sidebar */}
                    <Col lg={3}>
                        <Card body className="card-default">
                            <p className="lead">Article Data</p>
                            <p>Categories</p>
                            <Select
                                name="articleCategories"
                                multi
                                simpleValue
                                value={this.state.articleCategories}
                                onChange={this.handleChangeSelect.bind(this, 'articleCategories')}
                                options={CATEGORIES}
                            />

                            {this.state.articleCategories === "enclosure" ? enclosureListTitle : null}
                            {this.state.articleCategories === "enclosure" ? enclosureListChoice : null}

                            <p className="mt-2">Tags</p>
                            <Select
                                name="articleTags"
                                multi
                                simpleValue
                                value={this.state.articleTags}
                                onChange={this.handleChangeSelect.bind(this, 'articleTags')}
                                options={TAGS}
                            />
                            <p className="mt-2">Reviewers</p>
                            <Select
                                name="articleReviewers"
                                multi
                                simpleValue
                                value={this.state.articleReviewers}
                                onChange={this.handleChangeSelect.bind(this, 'articleReviewers')}
                                options={REVIEWERS}
                            />
                        </Card>
                    </Col>
                </Row>
            </ContentWrapper>
        );
    }

}

export default BlogArticleView;
