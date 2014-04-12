from django.shortcuts import render
from twilio.twiml import Response
from django.views.generic import View
from django.http import HttpResponse
# Create your views here.

class Queue(View):

    @csrf_exempt
    def get(self, request):
        res = twilio.twiml.Response()
        res.message("Hello, Mobile Monkey")
        twiml = '<Response><Message>Hello from your Django app!</Message></Response>'
        print str(res)
        return HttpResponse(twiml, content_type='text/xml')