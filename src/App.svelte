<script lang="ts">
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import Cart from './lib/Cart.svelte';
  import Auth from './lib/Auth.svelte';
  import { userStore } from './lib/stores';
  import { cartOpen } from './lib/stores';
  
  const routes = {
   '/':Home
  };

  function toggleCart() {
    cartOpen.update(value => !value);
  }

   let showLogin = false;
</script>


<nav>
  <div class="container">
    <div class="logo">Anzanation</div>
    <div class="nav-controls">
      {#if $userStore}
        <button class="cart-button" on:click={toggleCart}>Cart</button>
        <button on:click={() => userStore.set(null)}>Logout</button>
      {:else}
        <button on:click={() => showLogin = true}>Login</button>
      {/if}
    </div>
  </div>
</nav>


{#if showLogin}
  <Auth on:close={() => showLogin = false} />
{/if}

<main>
  <Router {routes} />
</main>

<Cart />

<style>
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

  :global(body) {  
    margin: 0;
    font-family: 'Playfair Display', serif;
    background-color:#2c3e50;
    color: #e3eaf0;
  }

  nav {
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5));
    color: hsl(61, 87%, 45%);
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0; 
    z-index: 100;
    /* box-shadow: 0 2px 10px rgba(0,0,0,0.1); */
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
    font-family: "Bebas Neue", sans-serif;
    font-size: 1.8em;
    font-weight: 600;
    
  }

  .cart-button {
    padding: 0.5rem 1rem;
    background: hsl(61, 87%, 45%);
    color: #2c3e50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: Helvetica, serif;
  }

  .cart-button:hover {
    background: hsl(61, 87%, 47%);
  }

  main {
    margin-top: 60px;
    min-height: calc(100vh - 60px);
  }
</style>