<div class="container-fluid">
	<div class="row">
		<div class="col-12">
			<h1>extend</h1>
			<p class="sub-header">bglib.extend(name, prototypeProps, staticProps)</p>
			<p>
				The <code>bglib.create</code> function creates a new module by extending a pre-registered module. Prototype and static properties passed in the 2nd and 3rd argument respectively overrides methods on the parent with the same name. Extending modules is the javascript equivalent of class inheritance in other languages.
			</p>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<table class="table arguments-table">
				<thead>
					<tr>
						<th>name</th>
						<th>type</th>
						<th>optional</th>
						<th>description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>name</td>
						<td><code>string</code></td>
						<td><code>false</code></td>
						<td>The registered name of the parent module.</td>
					</tr>
					<tr>
						<td>prototypeProps</td>
						<td><code>object</code></td>
						<td><code>true</code></td>
						<td>The prototype properties.</td>
					</tr>
					<tr>
						<td>staticProps</td>
						<td><code>object</code></td>
						<td><code>true</code></td>
						<td>The static properties.</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<p><strong>Also See:</strong> <a href="/base/set-registered-module">setRegisteredModule</a></p>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<?=$docs->renderLinkedHeader("Usage", "usage")?>
		</div>
		<div class="col-12">
			<?=$docs->getCodeExample("base/create", "extend", "javascript")?>
		</div>
	</div>
</div>
