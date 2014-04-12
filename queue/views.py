from django.shortcuts import render
from twilio.twiml import Response
import twilio.twiml
from django.views.generic import View
from django.http import HttpResponse

from rdio import Rdio
# Create your views here.

class Queue(View):

    def get(self, request):
        res = twilio.twiml.Response()
        body = request.GET['Body']
        results = searchRdio(body)
        print results
        twiml = '<Response><Message>message of ' +body+ ' was recieved</Message></Response>'
        res.message("You're song "+results + "has been found")
        return HttpResponse(twiml+ '/n' + results, content_type='text/xml')

        def searchRdio(query):
            rdio = Rdio(("WF00svqcVrTXHv3eHSQO1w"), ("FYAjVfujchx4eTCFAOD8ag"))
            results = rdio.call("search", {"query" :  query,
                                                        "types" : ["Track",],
                                                        "extras" : "isExplicit",
                                                        "count" : 1})
            return results[0]
