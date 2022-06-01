import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Container, Row, Col } from 'react-bootstrap'
ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { Bar } from 'react-chartjs-2'
import {FaArrowUp, FaArrowDown} from 'react-icons/fa'

const BarChart = ({labels, data: rawData, income=0, expense=0})=> {
const options = {
  chartAreaBorder: {
    borderColor: 'rgba(0, 0, 0, 0)'
  },
  scales: {
    x: {
      grid: {
        display: false,
      }
    },
    y: {
      grid: {
        display: false,
      }
    }
  },
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false,
    },
  },
};

 const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: rawData,
      backgroundColor: '#6379F4',
      borderRadius: 1000,
      barThickness: 14
    }
  ],
};
return (
  <Container>
      <Row>
          <Col xs={6}>
              <div>
                  <FaArrowDown className='text-color4' />
              </div>
              <div>Income</div>
              <h6>Rp. {Number(income).toLocaleString('id-ID')}</h6>
          </Col>
          <Col xs={6}>
              <div>
                  <FaArrowUp className='text-danger' />
              </div>
              <div>Expense</div>
              <h6>Rp. {Number(expense).toLocaleString('id-ID')}</h6>
          </Col>
          <Col xs={12} className='mt-5'>
              <Bar options={options} data={data}  />
          </Col>
      </Row>
  </Container>  
)
}

export default BarChart