import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import axiosClient from '../../axiosClient';
import PopulateItems from '../moduleComponents/populateItems';
import { useGlobalContext } from '../context/globalContextProvider';

import home from'./home.module.scss';

export default function Home() {
  const { 
    setAmount,
    displayTopPreBuildDesktop, setDisplayTopPreBuildDesktop,
    displayTopgamingLaptop, setDisplayTopgamingLaptop,
    displayTopgamingDesktop, setDisplayTopgamingDesktop,
    displayTopgamingAccessories, setDisplayTopgamingAccessories
  } = useGlobalContext();

  setAmount(0);

  async function fetchitems() {
    try {
      const [response1, response2, response3, response4] = await Promise.all([
        axiosClient.get('/populate-top-pre-build-desktops'),
        axiosClient.get('/populate-top-items', {
          params: { query1: 'gaming', query2: 'laptop' }
        }),
        axiosClient.get('/populate-top-items', {
          params: { query1: 'gaming', query2: 'desktop' }
        }),
        axiosClient.get('/populate-top-items', {
          params: { query1: 'gaming', query2: 'accessories' }
        })
      ]);

      setDisplayTopPreBuildDesktop(response1.data.data);
      setDisplayTopgamingLaptop(response2.data.data);
      setDisplayTopgamingDesktop(response3.data.data);
      setDisplayTopgamingAccessories(response4.data.data);

    } catch (error) {
      console.error('Failed to fetch items:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchitems();
  }, []);

  return (
    <div className={home.home}>
      {/* display top items*/}
      <div>
        <section>
          <div>
            <h3>Top Pre-build Dektops</h3>
          </div>
          <div className={home.displayitemwrapper}>
          {displayTopPreBuildDesktop? (
            <>
            {displayTopPreBuildDesktop?.map((item) => (
              <Link to={`item/${item.item_id}`} key={item.item_id}
              style={{ textDecoration: 'none'}}  
              >
                <PopulateItems item={item} />
              </Link>
            ))}
            </>
          ):(
            <p>No Items fetched</p>
          )}
          </div>
        </section>

        <section>
          <div>
            <h3>Top Gaming Laptops</h3>
          </div>
          <div className={home.displayitemwrapper}>
          {displayTopgamingLaptop? (
            <>
            {displayTopgamingLaptop?.map((item) => (
              <Link to={`item/${item.item_id}`} key={item.item_id}
              style={{ textDecoration: 'none'}}  
              >
                <PopulateItems item={item} />
              </Link>
            ))}
            </>
          ):(
            <p>No Items fetched</p>
          )}
          </div>
          
        </section>

        <section>
          <div>
            <h3>Top Gaming Desktops</h3>
          </div>
          <div className={home.displayitemwrapper}>
          {displayTopgamingDesktop? (
            <>
            {displayTopgamingDesktop?.map((item) => (
              <Link to={`item/${item.item_id}`} key={item.item_id}
              style={{ textDecoration: 'none'}}  
              >
                <PopulateItems item={item} />
              </Link>
            ))}
            </>
          ):(
            <p>No Items fetched</p>
          )}
          </div>
        </section>

        <section>
          <div>
            <h3>Top Gaming Accessories</h3>
          </div>
          <div className={home.displayitemwrapper}>
          {displayTopgamingAccessories? (
            <>
            {displayTopgamingAccessories?.map((item) => (
              <Link to={`item/${item.item_id}`} key={item.item_id}
              style={{ textDecoration: 'none'}}  
              >
                <PopulateItems item={item} />
              </Link>
            ))}
            </>
          ):(
            <p>No Items fetched</p>
          )}
          </div>
        </section>

      </div>
    </div>
  )
}