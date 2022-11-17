// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

const statusContent = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  onProgress: 'ON_PROGRESS',
}
class CowinDashboard extends Component {
  state = {status: statusContent.initial, dataDetails: {}}

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({status: statusContent.onProgress})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()
    if (response.ok === true) {
      this.setState({dataDetails: data, status: statusContent.success})
    } else {
      this.setState({status: statusContent.failure})
    }
  }

  loaderView = () => (
    <div className="loader" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  viewResult = () => {
    const {dataDetails} = this.state
    return (
      <>
        <div className="vaccination-container">
          <h1 className="vacc-heading">Vaccination Coverage</h1>
          <VaccinationCoverage
            dataDetails={dataDetails.last_7_days_vaccination}
          />
        </div>
        <div className="vaccination-container">
          <h1 className="vacc-heading">Vaccination by gender</h1>
          <VaccinationByGender
            dataDetails={dataDetails.vaccination_by_gender}
          />
        </div>
        <div className="vaccination-container">
          <h1 className="vacc-heading">Vaccination by age</h1>
          <VaccinationByAge dataDetails={dataDetails.vaccination_by_age} />
        </div>
      </>
    )
  }

  viewFailure = () => (
    <div className="fail">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="fail-font">something went wrong</h1>
    </div>
  )

  render() {
    const {status} = this.state
    return (
      <div className="container">
        <div className="nav">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-size"
          />
          <h1 className="logo-style">Co-WIN</h1>
        </div>
        <h1 className="heading">CoWIN Vaccination in India</h1>

        {status === statusContent.onProgress && this.loaderView()}
        {status === statusContent.success && this.viewResult()}
        {status === statusContent.failure && this.viewFailure()}
      </div>
    )
  }
}
export default CowinDashboard
