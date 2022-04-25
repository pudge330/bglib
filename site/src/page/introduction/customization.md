# Customization

```php
class App\AppCompiler extends Lynk\Component\ApplicationCompiler\AppCompiler {
	protected function templateMap() {
		return Array(
			'/path/to/file-template.php' =&gt; 'app/bootstrap.php'
		);
	}
}
```

```html
&lt;div class=&quot;formField textField field_test_text1&quot;&gt;
	&lt;div class=&quot;fieldLabelWrap&quot;&gt;&lt;label class=&quot;fieldLabel&quot; for=&quot;test_text1&quot;&gt;Text&lt;/label&gt;&lt;/div&gt;
	&lt;div class=&quot;fieldWrap&quot;&gt;&lt;input class=&quot;fieldInput test_text1&quot; name=&quot;test[text1]&quot; type=&quot;text&quot; id=&quot;test_text1&quot;&gt;&lt;/div&gt;
	&lt;div class=&quot;fieldHelp&quot;&gt;Please enter a value.&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;formField textareaField field_test_textarea1&quot;&gt;
	&lt;div class=&quot;fieldLabelWrap&quot;&gt;&lt;label class=&quot;fieldLabel&quot; for=&quot;test_textarea1&quot;&gt;Textarea&lt;/label&gt;&lt;/div&gt;
	&lt;div class=&quot;fieldWrap&quot;&gt;&lt;textarea class=&quot;fieldInput test_textarea1&quot; name=&quot;test[textarea1]&quot; type=&quot;text&quot; id=&quot;test_textarea1&quot;&gt;&lt;/textarea&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;formField colorField field_test_color1&quot;&gt;
	&lt;div class=&quot;fieldLabelWrap&quot;&gt;&lt;label class=&quot;fieldLabel&quot; for=&quot;test_color1&quot;&gt;Color 1&lt;/label&gt;&lt;/div&gt;
	&lt;div class=&quot;fieldWrap&quot;&gt;&lt;input class=&quot;fieldInput test_color1&quot; name=&quot;test[color1]&quot; type=&quot;color&quot; id=&quot;test_color1&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;formField doubleField field_test_double1&quot;&gt;
	&lt;div class=&quot;fieldLabelWrap&quot;&gt;&lt;label class=&quot;fieldLabel&quot; for=&quot;test_double1&quot;&gt;Double 1&lt;/label&gt;&lt;/div&gt;
	&lt;div class=&quot;fieldWrap&quot;&gt;&lt;input class=&quot;fieldInput test_double1&quot; step=&quot;0.01&quot; name=&quot;test[double1]&quot; type=&quot;number&quot; id=&quot;test_double1&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;formField integerField field_test_integer1&quot;&gt;
	&lt;div class=&quot;fieldLabelWrap&quot;&gt;&lt;label class=&quot;fieldLabel&quot; for=&quot;test_integer1&quot;&gt;Integer 1&lt;/label&gt;&lt;/div&gt;
	&lt;div class=&quot;fieldWrap&quot;&gt;&lt;input class=&quot;fieldInput test_integer1&quot; step=&quot;1&quot; name=&quot;test[integer1]&quot; type=&quot;number&quot; id=&quot;test_integer1&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;input class=&quot;formField hiddenField fieldInput test_hidden1&quot; name=&quot;test[hidden1]&quot; type=&quot;hidden&quot; id=&quot;test_hidden1&quot;&gt;
&lt;div class=&quot;formField passwordField requiredField field_test_password&quot;&gt;
	&lt;div class=&quot;fieldLabelWrap&quot;&gt;&lt;label class=&quot;fieldLabel&quot; for=&quot;test_password&quot;&gt;Password&lt;/label&gt;&lt;/div&gt;
	&lt;div class=&quot;fieldWrap&quot;&gt;&lt;input class=&quot;fieldInput test_password&quot; name=&quot;test[password]&quot; type=&quot;password&quot; id=&quot;test_password&quot; required=&quot;required&quot; maxlength=&quot;50&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;formField rangeField field_test_range1&quot;&gt;
	&lt;div class=&quot;fieldLabelWrap&quot;&gt;&lt;label class=&quot;fieldLabel&quot; for=&quot;test_range1&quot;&gt;Range&lt;/label&gt;&lt;/div&gt;
	&lt;div class=&quot;fieldWrap&quot;&gt;&lt;input class=&quot;fieldInput test_range1&quot; step=&quot;1&quot; name=&quot;test[range1]&quot; type=&quot;range&quot; id=&quot;test_range1&quot; min=&quot;1&quot; maxlength=&quot;100&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;formField fileField field_test_file1&quot;&gt;
	&lt;div class=&quot;fieldLabelWrap&quot;&gt;&lt;label class=&quot;fieldLabel&quot; for=&quot;test_file1&quot;&gt;File 1&lt;/label&gt;&lt;/div&gt;
	&lt;div class=&quot;fieldWrap&quot;&gt;&lt;input class=&quot;fieldInput test_file1&quot; name=&quot;test[file1]&quot; type=&quot;file&quot; id=&quot;test_file1&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;formField dateField field_test_date1&quot;&gt;
	&lt;div class=&quot;fieldLabelWrap&quot;&gt;&lt;label class=&quot;fieldLabel&quot; for=&quot;test_date1&quot;&gt;Date 1&lt;/label&gt;&lt;/div&gt;
	&lt;div class=&quot;fieldWrap&quot;&gt;&lt;input class=&quot;fieldInput test_date1&quot; name=&quot;test[date1]&quot; type=&quot;date&quot; id=&quot;test_date1&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;formField timeField field_test_time1&quot;&gt;
	&lt;div class=&quot;fieldLabelWrap&quot;&gt;&lt;label class=&quot;fieldLabel&quot; for=&quot;test_time1&quot;&gt;Time&lt;/label&gt;&lt;/div&gt;
	&lt;div class=&quot;fieldWrap&quot;&gt;&lt;input class=&quot;fieldInput test_time1&quot; name=&quot;test[time1]&quot; type=&quot;time&quot; id=&quot;test_time1&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
```