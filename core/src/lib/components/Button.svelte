<script lang="ts">
    import type { ButtonProps } from "../types";
    const { buttonText, onClick }: ButtonProps = $props();
</script>

<button onclick={onClick}>{buttonText}</button>
