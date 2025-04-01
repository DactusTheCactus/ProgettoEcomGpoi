<script lang="ts">
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import Cart from './lib/Cart.svelte';
  import { cartOpen } from './lib/stores';
  
  const routes = {
   Home,
  };

  function toggleCart() {
    cartOpen.update(value => !value);
  }
</script>

<nav>
  <div class="container">
    <div class="logo">Anzanation</div>
    <div class="nav-controls">
      <button class="cart-button" on:click={toggleCart}>
        Cart
      </button>
    </div>
  </div>
</nav>

<main>
  <Router {routes} />
</main>

<Cart />

<style>
  :global(body) {  
    margin: 0;
    font-family: 'Playfair Display', serif;
    background: #fafafa;
    color: #2c3e50;
  }

  nav {
    background: #ffffff;
    color: #2c3e50;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.8em;
    font-weight: 600;
    color: #166534;
  }

  .cart-button {
    padding: 0.5rem 1rem;
    background: #166534;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Playfair Display', serif;
  }

  .cart-button:hover {
    background: #15803d;
  }

  main {
    margin-top: 60px;
    min-height: calc(100vh - 60px);
  }
</style>