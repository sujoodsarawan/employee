import React, { Component } from 'react';
import axios from 'axios';
import FormInput from '../../../Component/FormInput/FormInput';
import Form from '../../../Component/FormInput/Form';
import OrderSummary from '../../../Component/OrderSummary/OrderSummary';
import Modal from '../../../Component/backDrop/Modal';


const inputs = [
  {
    name: "nationalId",
    type: "text",
    label: "National Id",
    disabled: true,
    required: true,
  }, {
    name: "fname",
    type: "text",
    label: "First Name",
    disabled: true,
    required: true,
  },
  {
    name: "sname",
    type: "text",
    label: "Second Name",
    disabled: true,
    required: true,
  },
  {
    name: "tname",
    type: "text",
    label: "Third Name",
    disabled: true,
    required: true,
  },
  {
    name: "lname",
    type: "text",
    label: "Last Name",
    disabled: true,
    required: true,
  }, {
    name: "birthDate",
    type: "text",
    label: "Birth Date",
    disabled: true,
    required: true,
  }, {
    name: "birthCertificateReleaseDate",
    type: "text",
    label: "Release Date",
    disabled: true,
    required: true,
  }
];
class userBirthDetails extends Component {
  constructor(props) {
    super(props);
    this.state = inputs.reduce(
      (acc, input) => {
        return { ...acc, [input.name]: "" };
      },
      {
        fname: "",
        sname: "",
        tname: "",
        lname: "",
        nationalId: "",
        birthDate: "",
        birthCertificateReleaseDate: "",
        loading: false,
        error: false,
        show: false,
        complete: false,
        status: '',
        Post: '',
      }
    );
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`https://graduationproject1.herokuapp.com/admin/getuserbynationalid/${id}`)
      .then(res => {
        console.log(res)
        const data = res.data.doc;
        this.setState({
          loading: true,
          show: true,
          fname: data.firstName,
          sname: data.secondName,
          tname: data.thirdName,
          lname: data.lastName,
          birthDate: new Date(data.birthDate).toDateString(),
          nationalId: data.nationalId,
          birthCertificateReleaseDate:new Date(data.birthCertificateReleaseDate).toDateString(),
          Post: data.message,
          status: data.status,
        });
      }).catch(error => {
        this.setState({
          error: true
        })
      })
  }

  handelChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };
  AcceptRequestHandler = (event) => {
    event.preventDefault();
    const { nationalId } = this.state;

    axios.delete(`https://graduationproject1.herokuapp.com/birthcertificate/deleteRequestedBirthCertificate/${nationalId}`)
      .then((response) => {
        console.log(response)
        this.setState({
          Post: "Email Sent ",
          status: response.status,
          complete: true,
        })
      })
      .catch((error) => { console.log(error); });
  };
  RejectRequestHandler = (event) => {
    event.preventDefault();
    const { nationalId } = this.state;
    const data = {
      nationalid: nationalId,
    };

    console.log(data);

    axios.delete(`https://graduationproject1.herokuapp.com/birthcertificate/deleteRequestedBirthCertificateForChild/${nationalId}`)
      .then((response) => {
        console.log(response)
        this.setState({
          Post: "Email Sent",
          status: response.status,
          complete: true,
        })
      })
      .catch((error) => { console.log(error) });
  };
  RedirectHandler = () => { this.props.history.replace("/order/birth/certificate"); };
  StayOnPageHandler = () => {
    this.setState({ complete: false });
  };
  render() {
    const { loading, status, Post, complete } = this.state;


    const list = inputs.map((input) => {
      return (
        <FormInput
          name={input.name}
          key={input.name}
          type={input.type}
          value={this.state[input.name]}
          label={input.label}
          handelChange={this.handelChange}
          disabled={input.disabled}
          required={input.required}
        />

      );
    });

    let Order = null;

    Order = (
      <OrderSummary
        title="Order Birth Certificate"
        post={Post}
        status={status}
        RedirectHandler={
         status === 200 ? this.RedirectHandler : this.StayOnPageHandler
        }
      />)
    const form = loading ? <Form
      title="Order Birth Certificate"
      handelSubmit={this.handleSubmit}
      AcceptRequestHandler={this.AcceptRequestHandler}
      RejectRequestHandler={this.RejectRequestHandler}
      list={list}

    /> : <div className="loader">loading ..</div>
    return (
      <div>
        <div className="main_container">
          <Modal show={complete}>{Order} </Modal>

          {form}
        </div>
      </div>
    );
  }
}

export default userBirthDetails;