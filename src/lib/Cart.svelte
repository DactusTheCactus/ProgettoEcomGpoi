<script lang="ts">
  import { cartStore, cartOpen } from './stores';
  import type { Product } from './types';

  function removeFromCart(product: Product) {
    cartStore.update(items => items.filter(item => item.id !== product.id));
  }

  function closeCart() {
    cartOpen.set(false);
  }

  $: total = $cartStore.reduce((sum, item) => sum + item.price, 0);
</script>

{#if $cartOpen}
  <div class="cart-overlay" on:click={closeCart}>
    <div class="cart" on:click|stopPropagation>
      <button class="close-btn" on:click={closeCart}>×</button>
      <h2>Your Collection</h2>
      
      {#if $cartStore.length === 0}
        <p>Your collection is empty</p>
      {:else}
        <div class="cart-items">
          {#each $cartStore as item}
            <div class="cart-item">
              <img src={item.imageUrl} alt={item.name} />
              <div class="item-details">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <button class="remove-btn" on:click={() => removeFromCart(item)}>Remove</button>
            </div>
          {/each}
          }
        </div>
        <div class="cart-total">
          <h3>Total: ${total}</h3>
          <button class="checkout-btn">Proceed to Checkout</button>
        </div>
      {/if}
      }
    </div>
  </div>
{/if}
}

<style>
  .cart-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: flex-end;
    z-index: 1000;
    backdrop-filter: blur(3px);
  }

  .cart {
    width: 450px;
    background: white;
    height: 100%;
    padding: 2rem;
    position: relative;
    overflow-y: auto;
    box-shadow: -2px 0 20px rgba(0,0,0,0.1);
  }

  .close-btn {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 1.5em;
    background: none;
    border: none;
    cursor: pointer;
    color: #2c3e50;
  }

  .cart h2 {
    color: #166534;
    font-size: 1.8em;
    margin-bottom: 2rem;
  }

  .cart-items {
    margin-top: 1rem;
  }

  .cart-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    margin-bottom: 1rem;
    background: #f8fafc;
    border-radius: 12px;
    transition: transform 0.2s ease;
  }

  .cart-item:hover {
    transform: translateY(-2px);
  }

  .cart-item img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 8px;
  }

  .item-details {
    margin-left: 1.5rem;
    flex-grow: 1;
  }

  .item-details h3 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.1em;
  }

  .item-details p {
    color: #166534;
    font-weight: 600;
    margin: 0.5rem 0;
  }

  .remove-btn {
    padding: 0.5rem 1rem;
    background: #fee2e2;
    color: #dc2626;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .remove-btn:hover {
    background: #fecaca;
  }

  .cart-total {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 2px solid #f1f5f9;
  }

  .checkout-btn {
    background: #166534;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
    font-size: 1.1em;
    font-weight: 500;
    transition: background 0.2s ease;
  }

  .checkout-btn:hover {
    background: #15803d;
  }
</style>