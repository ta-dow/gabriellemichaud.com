#!/usr/bin/env python3

from flask import Flask, render_template, request
app = Flask(__name__)

@app.route("/<name>.html")
def page(name=None):
    return render_template(f'{name}.html')

@app.route("/contact_form.html", methods=['GET', 'POST'])
def contact_form():
    if request.method == 'GET':
        return render_template('contact_form.html')

    elif request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        message = request.form.get('message')

        print(name, email, subject, message)
        return render_template('contact_form.html', success=True, details="Message sucessfully sent to Gaby.<br/><br/>Thanks for reaching out!")








if __name__ == '__main__':
    app.run(debug=True)