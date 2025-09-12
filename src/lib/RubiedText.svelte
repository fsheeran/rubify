<script lang="ts">
    const { baseText, rubyText } = $props()
</script>

<ruby>
  {baseText}
  <rp>(</rp><rt>{rubyText}</rt><rp>)</rp>
</ruby>