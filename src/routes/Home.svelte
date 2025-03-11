<script lang="ts">
  import { onMount } from 'svelte';
  import { db } from '../lib/firebase';
  import { collection, getDocs } from 'firebase/firestore';
  import type { Product } from '../lib/types';
  import { cartStore, cartOpen } from '../lib/stores';

  let products: Product[] = [];
  let loading = true;

  onMount(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      loading = false;
    }
  });

  function addToCart(product: Product) {
    cartStore.update(items => [...items, product]);
    cartOpen.set(true);
  }
</script>

<main>
  <header class="hero">
    <h1>Anzanation</h1>
    <p>Sconti stagionali</p>
  </header>

  {#if loading}
    <div class="loading">Loading exquisite pieces...</div>
  {:else}
    <div class="products">
      {#each products as product}
        <div class="product-card">
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p class="price">${product.price}</p>
          <button on:click={() => addToCart(product)}>Add to Cart</button>
        </div>
      {/each}
      }
    </div>
  {/if}
  }
</main>

<style>
  main {
    padding-top: 60px;
  }

  .hero {
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(45deg, #1a1a1a, #4a4a4a);
    color: #fff;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%);
    z-index: 1;
  }

  .hero h1 {
    font-size: 4em;
    margin: 0;
    z-index: 2;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }

  .hero p {
    font-size: 1.5em;
    margin-top: 0.5em;
    z-index: 2;
  }

  .products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .product-card {
    background: white;
    border-radius: 15px;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }

  .product-card:hover {
    transform: translateY(-5px);
  }

  .product-card img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
  }

  .product-card h2 {
    margin: 1rem 0;
    font-size: 1.5em;
  }

  .price {
    font-size: 1.25em;
    color: #666;
    margin-bottom: 1rem;
  }

  button {
    width: 100%;
    padding: 1rem;
    background: #1a1a1a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background: #333;
  }

  .loading {
    text-align: center;
    padding: 2rem;
    font-size: 1.2em;
    color: #666;
  }
</style>