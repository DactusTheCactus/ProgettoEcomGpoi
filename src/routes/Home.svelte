<script lang="ts">
  import { onMount } from 'svelte';
  import { db } from '../lib/firebase';
  import { collection, getDocs } from 'firebase/firestore';
  import type { Product } from '../lib/types';
  import { cartStore, cartOpen } from '../lib/stores';

  let products: Product[] = [];
  let loading = true;
  let categories: string[] = [];

  onMount(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      categories = [...new Set(products.map(p => p.category))];
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
</script>

<main>
  <section class="hero">
    <div class="hero-content">
      <h1>Anzanation</h1>
      <p>Discover the best guns in the US! 🦅🇺🇸🦅</p>
    </div>
  </section>

  <section class="products-section">
    {#if loading}
      <div class="loading">Loading our collection...</div>
    {:else}
      <div class="filters">
        <h2>Categories</h2>
        {#each categories as category}
          <button class="filter-btn">{category}</button>
        {/each}
      </div>

      <div class="products-grid">
        {#each products as product}
          <div class="product-card">
            <div class="product-image">
              <img src={product.imageUrl} alt={product.name} loading="lazy" />
            </div>
            <div class="product-info">
              <h3>{product.name}</h3>
              <p class="price">${product.price}</p>
              <p class="description">{product.description}</p>
              <button class="add-to-cart" on:click={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</main>

<style>
  .hero {
    height: 70vh;
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../assets/RAtto.jpeg');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
  }

  .hero-content h1 {
    font-size: 4em;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }

  .products-section {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .filters {
    margin-bottom: 2rem;
  }

  .filter-btn {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    background: #f3f4f6;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }

  .product-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s ease;
  }

  .product-card:hover {
    transform: translateY(-4px);
  }

  .product-image img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  .product-info {
    padding: 1rem;
  }

  .price {
    font-size: 1.25em;
    color: #166534;
    font-weight: bold;
  }

  .add-to-cart {
    width: 100%;
    padding: 0.75rem;
    background: #166534;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .add-to-cart:hover {
    background: #15803d;
  }

  @media (max-width: 768px) {
    .hero-content h1 {
      font-size: 2.5em;
    }
    
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
</style>