import populateItems from './populateItems.module.scss';

export default function PopulateItems({ item }) {
  return (
    <div className={populateItems.populateItems}>
      <img src={`${import.meta.env.VITE_API_BASE_URL}${item.image_url}`} alt={item.item_name}/>
      <div>
        <h4> {item.item_name} </h4>
        <div className={populateItems.itemDetails}> 
          <div className={populateItems.rating}><p> rating: {item.rating} </p></div>
          <div className={populateItems.stocks}><p> Stocks: {item.stocks} </p></div>
        </div>
      </div>
    </div>
  );
}