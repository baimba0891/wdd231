const backupData = [
  {"id":1,"name":"Bunce Island","region":"Western Area","category":"history","description":"18th-century slave fort, a powerful UNESCO heritage site near Freetown.","image":"images/bunce.webp"},
  {"id":2,"name":"River Number Two Beach","region":"Western Area","category":"beach","description":"Pristine white sand beach consistently ranked among the world's most beautiful.","image":"images/rivertwo.webp"},
  {"id":3,"name":"Tacugama Chimpanzee Sanctuary","region":"Western Area","category":"nature","description":"Rescue and conservation center for endangered chimpanzees in the forest.","image":"images/tacugama.webp"},
  {"id":4,"name":"Tiwai Island","region":"Southern Province","category":"nature","description":"Wildlife sanctuary home to pygmy hippos and 11 primate species.","image":"images/tiwai.webp"},
  {"id":5,"name":"Tokeh Beach","region":"Western Area","category":"beach","description":"Luxury beach resort area with golden sands and clear waters.","image":"images/tokeh.webp"},
  {"id":6,"name":"National Museum","region":"Western Area","category":"culture","description":"Houses Sierra Leone's rich cultural artifacts and history.","image":"images/museum.webp"},
  {"id":7,"name":"Lumley Beach","region":"Western Area","category":"beach","description":"Vibrant city beach in Freetown with restaurants and nightlife.","image":"images/lumley.webp"},
  {"id":8,"name":"Outamba-Kilimi Park","region":"Northern Province","category":"nature","description":"National park with elephants, savannah, and jungle landscapes.","image":"images/outamba.webp"},
  {"id":9,"name":"Banana Islands","region":"Western Area","category":"beach","description":"Historic islands with fishing villages and snorkeling spots.","image":"images/banana.webp"},
  {"id":10,"name":"Cotton Tree","region":"Western Area","category":"history","description":"Historic symbol of Freetown where freed slaves gathered in 1792.","image":"images/cotton.webp"},
  {"id":11,"name":"John Obey Beach","region":"Western Area","category":"beach","description":"Quiet surf beach perfect for relaxation away from crowds.","image":"images/johnobey.webp"},
  {"id":12,"name":"Gola Rainforest","region":"Eastern Province","category":"nature","description":"Largest remaining tract of Upper Guinean rainforest.","image":"images/gola.webp"},
  {"id":13,"name":"Bureh Beach","region":"Western Area","category":"culture","description":"Famous surfing beach and host of the annual Bureh Beach Carnival.","image":"images/bureh.webp"},
  {"id":14,"name":"Fourah Bay College","region":"Western Area","category":"history","description":"First university in West Africa, founded in 1827.","image":"images/fourah.webp"},
  {"id":15,"name":"Lakka Beach","region":"Western Area","category":"beach","description":"Popular local beach with colorful fishing boats and fresh seafood.","image":"images/lakka.webp"}
];

export async function getPlaces() {
  try {
    let response = await fetch('./data/places.json');
    if (!response.ok) {
      response = await fetch('data/places.json');
    }
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    console.log('Loaded from JSON:', data.length, 'places');
    return data;
  } catch (error) {
    console.warn('Fetch failed, using backup data:', error);
    return backupData;
  }
}
