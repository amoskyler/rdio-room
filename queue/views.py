from django.shortcuts import render
import twilio.twiml
from django.views.generic import View
# Create your views here.

class Queue(View):

    def get(self, request):
        res = twilio.twiml.Response()
        res.message("Hello, Mobile Monkey")
        print str(res)
