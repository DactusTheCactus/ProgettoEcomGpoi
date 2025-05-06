<script lang="ts">
  import { onMount } from 'svelte';
  import type { Product } from '../lib/types';
  import { cartStore, cartOpen } from '../lib/stores';

  let products: Product[] = [];
  let loading = true;
  let categories: string[] = [];
  const API_URL = 'http://localhost:3001';


  onMount(async () => {
    try {
      products = await fetch(`${API_URL}/api/products/`).then(res => res.json());
      // Fetch products from Firestore
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      loading = false;
    }
  });

  function addToCart(product: Product) {
    cartStore.update(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (!existingItem) {
        return [...items, { ...product, quantity: 1 }];
      }
      return items;
    });
    cartOpen.set(true);
  }
// Add random quotes
const streetQuotes = [
  "Everyday sto con i miei🗣️",
  "Everyday sono anzalone 👑",
  "Power moves only 💯",
  "Trust the process 🏆",
  "Elite mindset, elite results 💫"
];

let randomQuote = streetQuotes[Math.floor(Math.random() * streetQuotes.length)];
</script>

<main class="dark-theme">
  <section class="hero">
    <div class="hero-content">
      <div class="brand-tag">EST. 2024</div>
      <h1>Anzanation</h1>
      <p class="hero-subtitle">Anzanation: Lusso audace per chi traccia la propria strada.</p>
      <div class="street-quote">{randomQuote}</div>
    </div>
  </section>

  <section class="about-us">
    <h2 class="section-title">Di più sulla Dinastia</h2>
    <div class="about-content">
      <p> Nato nelle strade, elevato al lusso. Anzanation rappresenta la perfetta fusione tra autenticità grezza e qualità premium. Non vendiamo solo prodotti, curiamo esperienze per coloro che osano distinguersi.</p>
      <div class="stats">
        <div class="stat">
          <span class="stat-number">5K+</span>
          <span class="stat-label">Anzanation Lovers</span>
        </div>
        <div class="stat">
          <span class="stat-number">100%</span>
          <span class="stat-label">Authentic</span>
        </div>
        <div class="stat">
          <span class="stat-number">24/7</span>
          <span class="stat-label">Excellence</span>
        </div>
      </div>
    </div>
  </section>

  <section class="products-section">
    {#if loading}
      <div class="loading">Loading the excellence...</div>
    {:else}
      <div class="filters">
        <h2 class="section-title">Categories</h2>
        <div class="filter-buttons">
          {#each categories as category}
            <button class="filter-btn">{category}</button>
          {/each}
        </div>
      </div>

      <div class="products-grid">
        {#each products as product}
          <div class="product-card">
            <div class="product-image">
              <img src={product.imageUrl} alt={product.name} loading="lazy" />
              <div class="product-overlay">
                <button class="add-to-cart" on:click={() => addToCart(product)}>
                  Add to Collection
                </button>
              </div>
            </div>
            <div class="product-info">
              <h3>{product.name}</h3>
              <p class="price">${product.price}</p>
              <p class="description">{product.description}</p>
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

  .product-card {
    background: #1a1a1a;
    border: 1px solid #333;
    position: relative;
    overflow: hidden;
  }

  .product-image {
    position: relative;
  }

  .product-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .product-card:hover .product-overlay {
    opacity: 1;
  }

  .add-to-cart {
    background: #ffd700;
    color: #000000;
    border: none;
    padding: 1rem 2rem;
    font-weight: bold;
    transform: translateY(20px);
    transition: all 0.3s ease;
  }

  .product-card:hover .add-to-cart {
    transform: translateY(0);
  }

  .price {
    color: #ffd700;
    font-size: 1.5em;
  }

  @media (max-width: 768px) {
    .hero-content h1 {
      font-size: 3em;
    }

    .stats {
      flex-direction: column;
      gap: 2rem;
    }

    .product-overlay {
      opacity: 1;
    }
  }
</style>