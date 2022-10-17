import React, { Component } from "react";
import { addNewPost } from "./actions";
import { connect } from "react-redux";

// TODO Import `connect()`, write a `mapState()` function that extracts the
// TODO data this component needs, and default-export the connected component.
// TODO Be sure to hook up `addNewPost()` so the component can dispatch the action.

function mapStateToProps(state) {
  return { authors: state.authors };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewPost: (authorId, title) => {
      dispatch(addNewPost(authorId, title));
    }
  };
};

class NewPostForm extends Component {
  state = {
    title: "",
    selectedAuthor: null
  };

  onSelectedAuthorChanged = (e) => {
    const { value } = e.target;
    this.setState({ selectedAuthor: value || null });
  };

  onPostTitleChanged = (e) => {
    const { value } = e.target;
    this.setState({ title: value });
  };

  onAddNewPostClicked = () => {
    if (this.state.selectedAuthor && this.state.title) {
      this.props.addNewPost(this.state.selectedAuthor, this.state.title);
      this.setState({
        title: "",
        selectedAuthor: null
      });
    }

    // TODO Dispatch an action with the title and the selected author ID,
    // TODO using the `addNewPost()` action creator.  Afterwards, clear the post title field by
    // TODO setting it to an empty string.
    // TODO Only dispatch if the selected author isn't null, and
    // TODO the current post title isn't an empty string
  };

  render() {
    const { title = "", selectedAuthor = null } = this.state;
    const { authors = [] } = this.props;

    const authorsOptions = authors.map((author) => (
      <option key={author.authorId} value={author.authorId}>
        {author.name}
      </option>
    ));
    // Add an empty selection option
    authorsOptions.unshift(<option key="empty" value="" />);

    return (
      <div>
        <h4>New Post</h4>
        Title:
        <input type="text" onChange={this.onPostTitleChanged} value={title} />
        <div>
          Author:{" "}
          <select
            value={selectedAuthor || ""}
            onChange={this.onSelectedAuthorChanged}
          >
            {authorsOptions}
          </select>
        </div>
        <div>
          <button onClick={this.onAddNewPostClicked}>Add New Post</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostForm);
