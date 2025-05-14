<script lang="ts">
  import { onMount } from 'svelte';
  import type { Product } from '../lib/types';
  import { cartStore, cartOpen, userStore } from '../lib/stores';


  let products: Product[] = [];
  let loading = true;
  let categories: string[] = [];
  const API_URL = 'http://localhost:3001';



  onMount(async () => {
  try {
    const response = await fetch(`${API_URL}/api/products/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // log
    console.log('Received data:', data);

    // Validazione array
    if (!Array.isArray(data)) {
      throw new Error('Received data is not an array');
    }

    // mappa
    products = data.map((item: any) => {
      if (!item || typeof item !== 'object') {
        console.error('Invalid product item:', item);
        return null;
      }

      // Validate required fields
      const product = {
        id: item.id?.toString() || crypto.randomUUID(),
        name: item.name || 'Unnamed Product',
        price: Number(item.price) || 0,
        description: item.description || 'No description available',
        imageUrl: item.imageUrl || 'https://placehold.co/600x400/222/gold?text=Product+Image',
        category: item.category || 'Uncategorized'
      };

      return product;
    }).filter(product => product !== null); // Remove any null products

    // Extract unique categories from valid products
    categories = [...new Set(products.map(product => product.category))];
    
    console.log('Processed products:', products);
    
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
    categories = [];
  } finally {
    loading = false;
  }
});

  async function addToCart(product: Product) {
    if (!$userStore) {
      alert('Perfavore accedi per aggiungere al carrello');
      return;
    }
    
    cartStore.update(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (!existingItem) {
        return [...items, { ...product, quantity: 1 }];
      }
      return items;
    });
    cartOpen.set(true);
  }
  function Login() {
    
  }

const streetQuotes = [
  "Everyday sto con i miei🗣️",
  "Everyday sono anzalone 👑",
  "Power moves only 💯",
  "Trust the process 🏆",
  "Elite mindset, elite results 💫"
];

let randomQuote = streetQuotes[Math.floor(Math.random() * streetQuotes.length)];

// Category filter state
let selectedCategory: string = 'All';

// Filtered products derived from selectedCategory
$: filteredProducts = selectedCategory === 'All'
  ? products
  : products.filter(product => product.category === selectedCategory);

// Helper for image error
function handleImgError(e: Event) {
  const target = e.currentTarget as HTMLImageElement;
  target.src = 'https://placehold.co/600x400/222/gold?text=Image+Not+Found';
}
</script>

<main class="dark-theme">
  <section class="hero">
    <div class="hero-content">
      <div class="brand-tag">EST. 2021</div>
      <h1>Anzanation</h1>
      <p class="hero-subtitle">Anzanation: Lusso audace per chi traccia la propria strada.</p>
      <div class="street-quote">{randomQuote}</div>
    </div>
  </section>

  <section class="about-us">
    <h2 class="section-title">Di più sulla Dinastia</h2>
    <div class="about-content">
      <p>Nato nelle strade, elevato al lusso. Anzanation rappresenta la perfetta fusione tra autenticità grezza e qualità premium. Non vendiamo solo prodotti, curiamo esperienze per coloro che osano distinguersi.</p>
      <div class="stats">
        <div class="stat">
          <span class="stat-number">5K+</span>
          <span class="stat-label">Anzanation Lovers</span>
        </div>
        <div class="stat">
          <span class="stat-number">100%</span>
          <span class="stat-label">Authentic</span>
        </div>
      </div>
    </div>
  </section>

  <section class="products-section">
    {#if loading}
      <div class="loading">Caricando lo Stile...</div>
    {:else}
      <div class="filters">
        <h2 class="section-title">Categories</h2>
        <div class="filter-buttons">
          <button class="filter-btn" on:click={() => selectedCategory = 'All'} class:active={selectedCategory === 'All'}>All</button>
          {#each categories as category}
            <button class="filter-btn" on:click={() => selectedCategory = category} class:active={selectedCategory === category}>{category}</button>
          {/each}
        </div>
      </div>

      <div class="products-grid">
        {#each filteredProducts as product}
          <div class="product-card">
            <div class="product-image">
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy"
                on:error={handleImgError}
              />
            </div>
            <div class="product-info">
              <h3>{product.name}</h3>
              <p class="price">${product.price}</p>
              <p class="description">{product.description}</p>
              <button class="add-to-cart" on:click={() => addToCart(product)} disabled={!$userStore}>
                {$userStore ? 'Add to Collection' : 'Effettua il Login'}
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</main>

<style>
  :global(body) {
    background-color: #0a0a0a;
    color: #ffffff;
  }

  .dark-theme {
    background-color: #0a0a0a;
    min-height: 100vh;
  }

  .hero {
    height: 85vh;
    background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('../assets/RAtto.jpeg');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .hero-content {
    text-align: center;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #333;
    backdrop-filter: blur(10px);
  }

  .brand-tag {
    font-family: 'Courier New', monospace;
    color: #ffd700;
    margin-bottom: 1rem;
  }

  .hero-content h1 {
    font-size: 5em;
    margin: 0;
    background: linear-gradient(45deg, #ffd700, #ffffff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: none;
  }

  .hero-subtitle {
    font-size: 1.2em;
    color: #ffffff;
    margin-top: 1rem;
  }

  .street-quote {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    font-style: italic;
    color: #ffd700;
    font-size: 1.2em;
  }

  .section-title {
    font-size: 2.5em;
    text-align: center;
    color: #ffd700;
    margin: 2rem 0;
  }

  .about-us {
    padding: 4rem 2rem;
    background: #111111;
    margin: 2rem 0;
  }

  .about-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .stats {
    display: flex;
    justify-content: space-around;
    margin-top: 3rem;
  }

  .stat {
    text-align: center;
  }

  .stat-number {
    font-size: 2.5em;
    color: #ffd700;
    display: block;
  }

  .stat-label {
    color: #888;
  }

  .products-section {
    max-width: 1400px;
    margin: 4rem auto;
    padding: 0 2rem;
  }

  .filter-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .filter-btn {
    background: #1a1a1a;
    color: #ffd700;
    border: 1px solid #333;
    padding: 0.8rem 1.5rem;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .filter-btn:hover {
    background: #ffd700;
    color: #000000;
  }

  .filter-btn.active {
    background: #ffd700;
    color: #000000;
    font-weight: bold;
    border: 2px solid #ffd700;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    padding: 2rem 0;
  }

  .product-card {
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 4px;
    overflow: hidden;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .product-card:hover {
    transform: translateY(-5px);
  }

  .product-image {
    width: 100%;
    height: 280px;
    overflow: hidden;
    background-color: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .product-info {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .product-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2em;
    color: #ffffff;
  }

  .price {
    color: #ffd700;
    font-size: 1.5em;
    margin: 0.5rem 0;
  }

  .description {
    color: #888;
    font-size: 0.9em;
    margin: 0.5rem 0 1rem 0;
    flex-grow: 1;
  }

  .add-to-cart {
    width: 100%;
    background: #ffd700;
    color: #000000;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 2px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: auto;
  }

  .add-to-cart:hover {
    background: #ffffff;
    color: #000000;
  }

  @media (max-width: 768px) {
    .hero-content h1 {
      font-size: 3em;
    }

    .stats {
      flex-direction: column;
      gap: 2rem;
    }
  }
</style>