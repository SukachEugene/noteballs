<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace has-text-white">
          Noteballs
        </div>

        <a
          @click.prevent="showMobileNav = !showMobileNav"
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          ref="navbarBurgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showMobileNav }"
        ref="navBarMenuRef"
      >
        <div class="navbar-start">
          <button
            v-if="storeAuth.user.id"
            @click="logout"
            class="button is-small is-info my-3 ml-3"
          >
            Log out {{ storeAuth.user.email }}
          </button>
        </div>

        <div class="navbar-end">
          <RouterLink
            @click="showMobileNav = false"
            to="/"
            class="navbar-item has-text-white"
            active-class="is-active"
            >Notes
          </RouterLink>
          <RouterLink
            @click="showMobileNav = false"
            to="/stats"
            class="navbar-item has-text-white"
            active-class="is-active"
            >Stats
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
/**
 * imports
 */
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useStoreAuth } from "@/stores/storeAuth";

/**
 * stores
 */
const storeAuth = useStoreAuth();

/**
 * mobile nav
 */
const showMobileNav = ref(false);

/**
 * click outside to close
 */
const navBarMenuRef = ref(null);
const navbarBurgerRef = ref(null);

onClickOutside(
  navBarMenuRef,
  () => {
    showMobileNav.value = false;
  },
  {
    ignore: [navbarBurgerRef],
  }
);

/**
 * logout
 */
const logout = () => {
  showMobileNav.value = false;
  storeAuth.logOutUser();
};
</script>

<style scoped>
.navbar-item.is-active {
  background-color: rgb(33, 150, 95);
}

.navbar-menu.is-active {
  background-color: rgb(197, 203, 130);
}

@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
