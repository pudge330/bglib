<div class="container-fluid">
	<div class="row">
		<div class="col-12">
			<h1>bglib</h1>
			<p>
				The <code>bglib</code> object has a few functions that provide information about the library. It's also a reference point to all the functions (<code>bglib.fn.*</code>) and modules (<code>bglib.*</code>) in the library.
			</p>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<?=$docs->renderLinkedHeader("Functions", "functions")?>
			<h3 class="header-content"><code>bglib.getName()</code></h3>
			<p>Gets the library name as a string value.</p>
			<pre class="styled-code"><code class="language-javascript">// outputs: bglib
console.log(bglib.getName());</code></pre>
		</div>
	</div>
	<div class="row mt-4">
		<div class="col-12">
			<h3 class="header-content"><code>bglib.getVersion()</code></h3>
			<p>Gets the library's version number.</p>
			<pre class="styled-code"><code class="language-javascript">// outputs: 1.0
console.log(bglib.getVersion());</code></pre>
		</div>
	</div>
</div>
