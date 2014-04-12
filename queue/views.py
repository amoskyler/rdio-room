from django.shortcuts import render
from twilio.twiml import Response
import twilio.twiml
from django.views.generic import View
from django.http import HttpResponse
# Create your views here.

class Queue(View):

    def get(self, request):
        res = twilio.twiml.Response()
        textBody = request.values.get('Body', none)
        print textBody
        twiml = '<Response><Message>Hello from your Django app!</Message></Response>'
        return HttpResponse(twiml+ '/n' + textBody, content_type='text/xml')
