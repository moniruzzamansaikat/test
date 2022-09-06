import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loader from 'components/Loader';
import { loadPlanet, selectPlanet, toggleModal } from 'features/planet/planetSlice';
import { useEffect } from 'react';
import Modal from 'react-modal';
import styles from './PlanetModal.module.css';

Modal.setAppElement('#modal')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface PlanetModalProps {
  url: string;
}

function PlanetModal({ url }: PlanetModalProps) {
  const dispatch = useAppDispatch();
  const { modalOpen, status, planet } = useAppSelector(selectPlanet)

  useEffect(() => {
    dispatch(loadPlanet(url))
  }, [dispatch, url])

  function afterOpenModal() { }

  return (
    <div >
      <Modal
        isOpen={modalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => dispatch(toggleModal())}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={styles.planet_modal}>
          <div className={styles.planet_modal_header}>
            <h2>Planet Details</h2>
            <button onClick={() => dispatch(toggleModal())}>
              <i className="fa fa-times"></i>
            </button>
          </div>


          {status === 'loading' ? <Loader width='100px' /> :
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{planet?.name}</td>
                </tr>
                <tr>
                  <td>Climate</td>
                  <td>{planet?.climate}</td>
                </tr>
                <tr>
                  <td>Terrain</td>
                  <td>{planet?.terrain}</td>
                </tr>
                <tr>
                  <td>Diameter</td>
                  <td>{planet?.diameter}</td>
                </tr>
                <tr>
                  <td>Gravity</td>
                  <td>{planet?.gravity}</td>
                </tr>
                <tr>
                  <td>Surface Water</td>
                  <td>{planet?.surface_water}</td>
                </tr>
                <tr>
                  <td>Orbital Period</td>
                  <td>{planet?.orbital_period}</td>
                </tr>
              </tbody>
            </table>
          }

        </div>
      </Modal >
    </div>
  )
}

export default PlanetModal