from twisted.web.server import Site, NOT_DONE_YET
from twisted.web.resource import Resource
from twisted.internet import reactor
from twisted.web.static import File
from twisted.internet import defer

from random import randint

import json

from jinja2 import Environment, FileSystemLoader

#---------------
# JINJA STUFF
#---------------
template_root = './'
jloader = FileSystemLoader(template_root, encoding='utf-8')
jenv = Environment(
    block_start_string='[[',
    block_end_string=']]',
    variable_start_string='[-',
    variable_end_string='-]',
    comment_start_string='[#',
    comment_end_string='#]',
    loader=jloader,
    extensions=[],
    cache_size=50,
)

jenv.globals['cssurl'] = '/css/'
jenv.globals['jsurl'] = '/js/'

def jrender(request, template_name, params=None):
    """
    Use Jinja to render a html file
    """
    if params is None:
        params = {}
    request.setHeader("content-type", "text/html")
    return jenv.get_template(template_name).render(params).encode('utf-8')



class MainResource(Resource):
    """
    Handles the root directory
    """
    def render_GET(self, request):
        return jrender(request, 'index2.html')


class MenuItems(Resource):
    
    def render_GET(self, request):
        return json.dumps([
            {
                'name':'Dashboard',
                'action':'',
            },
            {
                'name':'Web0',
                'action':''
            },
            {
                'name':'Web1',
                'action':''
            },
            {
                'name':'Web2',
                'action':''
            }
        ])


class MiniWrap(Resource):
    def getChild(self, arg, request):
        if arg == '':
            return self
        return MiniViews(arg)

    def render_GET(self, request):
        web0 = {
            'id':'web0',
            'maxram':200
        }

        web1 = {
            'id':'web1',
            'maxram':200
        }

        web2 = {
            'id':'web2',
            'maxram':200
        }

        return json.dumps([
            web0,
            web1,
            web2,
        ])

        

class MiniViews(Resource):

    def __init__(self, sid):
        Resource.__init__(self)
        self.sid = sid

    def render_GET(self, request):
        print 'mini view'
        print self.sid
        mapper = {
            'web0':'Web0',
            'web1':'Web1',
            'web2':'Web2',
            'web3':'Web3'
        }

        webcrap = {
            'id':self.sid,
            'title':mapper[self.sid],
            'ram':randint(0, 32000),
            'ram_max':'32000',
            'connections':randint(0, 2000),
            'cpu':randint(0, 100)
        }
        return json.dumps(webcrap)

class Latency(Resource):
    
    def render_GET(self, request):
        print 'latency'
        return json.dumps(
        {"total_rows":569317,"offset":568727,"rows":[
        {"id":"bb1472fa216c2fdc11f615ddb4959aab","key":1353442612,"value":{"latency":1.2269596099853514737,"where":"prestonology","destination":"web0"}},
        {"id":"bb1472fa216c2fdc11f615ddb495a1d1","key":1353442618,"value":{"latency":1.1824843883514404297,"where":"prestonology","destination":"web2"}},
        {"id":"bb1472fa216c2fdc11f615ddb495a467","key":1353442622,"value":{"latency":0.89693536758422853783,"where":"prestonology","destination":"web1"}},
        {"id":"bb1472fa216c2fdc11f615ddb495a9ed","key":1353442683,"value":{"latency":0.41349263191223145641,"where":"hagna","destination":"qmoweb0"}},
        {"id":"bb1472fa216c2fdc11f615ddb495b83e","key":1353442685,"value":{"latency":0.37135677337646483265,"where":"hagna","destination":"qmoweb2"}},
        {"id":"bb1472fa216c2fdc11f615ddb495bc45","key":1353442686,"value":{"latency":0.28703680038452150658,"where":"hagna","destination":"qmoweb1"}},
        {"id":"bb1472fa216c2fdc11f615ddb495c118","key":1353442732,"value":{"latency":1.2481845855712889737,"where":"prestonology","destination":"web0"}},
        {"id":"bb1472fa216c2fdc11f615ddb495c521","key":1353442737,"value":{"latency":1.1592967987060547319,"where":"prestonology","destination":"web2"}},
        {"id":"bb1472fa216c2fdc11f615ddb495c929","key":1353442744,"value":{"latency":1.3805265903472900835,"where":"prestonology","destination":"web1"}},
        {"id":"bb1472fa216c2fdc11f615ddb495cecb","key":1353442803,"value":{"latency":0.43470678329467771217,"where":"hagna","destination":"qmoweb0"}},
        {"id":"bb1472fa216c2fdc11f615ddb495de57","key":1353442804,"value":{"latency":0.29241781234741209827,"where":"hagna","destination":"qmoweb2"}},
        {"id":"bb1472fa216c2fdc11f615ddb495ecf8","key":1353442807,"value":{"latency":0.53059058189392094285,"where":"hagna","destination":"qmoweb1"}},
        {"id":"bb1472fa216c2fdc11f615ddb495f83d","key":1353442851,"value":{"latency":1.0532800197601317471,"where":"prestonology","destination":"web0"}},
        {"id":"bb1472fa216c2fdc11f615ddb49603e0","key":1353442856,"value":{"latency":1.0160764217376709873,"where":"prestonology","destination":"web2"}},
        {"id":"bb1472fa216c2fdc11f615ddb4961242","key":1353442860,"value":{"latency":0.87690801620483393997,"where":"prestonology","destination":"web1"}},
        {"id":"bb1472fa216c2fdc11f615ddb49618c2","key":1353442923,"value":{"latency":0.3689514160156249778,"where":"hagna","destination":"qmoweb0"}},
        {"id":"bb1472fa216c2fdc11f615ddb4962466","key":1353442927,"value":{"latency":0.81456699371337892845,"where":"hagna","destination":"qmoweb2"}},
        {"id":"bb1472fa216c2fdc11f615ddb4962a9d","key":1353442929,"value":{"latency":0.35662302970886228248,"where":"hagna","destination":"qmoweb1"}},
        {"id":"bb1472fa216c2fdc11f615ddb49632b7","key":1353442972,"value":{"latency":1.0997230052947997159,"where":"prestonology","destination":"web0"}},
        {"id":"bb1472fa216c2fdc11f615ddb4963c2e","key":1353442982,"value":{"latency":2.1432846069335935724,"where":"prestonology","destination":"web2"}},
        {"id":"bb1472fa216c2fdc11f615ddb4963e63","key":1353442987,"value":{"latency":0.90857157707214353248,"where":"prestonology","destination":"web1"}},
        {"id":"bb1472fa216c2fdc11f615ddb496499b","key":1353443044,"value":{"latency":0.48857617378234863281,"where":"hagna","destination":"qmoweb0"}},
        {"id":"bb1472fa216c2fdc11f615ddb4964a4c","key":1353443046,"value":{"latency":0.41750202178955075905,"where":"hagna","destination":"qmoweb2"}},
        {"id":"bb1472fa216c2fdc11f615ddb4965a02","key":1353443047,"value":{"latency":0.24402637481689454235,"where":"hagna","destination":"qmoweb1"}},
        {"id":"bb1472fa216c2fdc11f615ddb4965add","key":1353443091,"value":{"latency":0.99491982460021977097,"where":"prestonology","destination":"web0"}},
        {"id":"bb1472fa216c2fdc11f615ddb4965b36","key":1353443096,"value":{"latency":0.94207496643066401809,"where":"prestonology","destination":"web2"}},
        {"id":"bb1472fa216c2fdc11f615ddb4965c55","key":1353443100,"value":{"latency":0.87397599220275878906,"where":"prestonology","destination":"web1"}},
        {"id":"bb1472fa216c2fdc11f615ddb4965de4","key":1353443164,"value":{"latency":0.42553381919860838734,"where":"hagna","destination":"qmoweb0"}},
        {"id":"bb1472fa216c2fdc11f615ddb4966a4f","key":1353443168,"value":{"latency":0.79327120780944826439,"where":"hagna","destination":"qmoweb2"}},
        {"id":"bb1472fa216c2fdc11f615ddb4967638","key":1353443171,"value":{"latency":0.63479537963867183059,"where":"hagna","destination":"qmoweb1"}},
        {"id":"bb1472fa216c2fdc11f615ddb4967bb5","key":1353443212,"value":{"latency":1.110089015960693315,"where":"prestonology","destination":"web0"}},
        {"id":"bb1472fa216c2fdc11f615ddb49686da","key":1353443217,"value":{"latency":1.0759912014007568803,"where":"prestonology","destination":"web2"}},
        {"id":"bb1472fa216c2fdc11f615ddb4969501","key":1353443221,"value":{"latency":0.84260401725769040748,"where":"prestonology","destination":"web1"}},
        {"id":"bb1472fa216c2fdc11f615ddb496a0e4","key":1353443284,"value":{"latency":0.4023719787597656028,"where":"hagna","destination":"qmoweb0"}},
        {"id":"bb1472fa216c2fdc11f615ddb496ab41","key":1353443286,"value":{"latency":0.56275959014892573684,"where":"hagna","destination":"qmoweb2"}},
        {"id":"bb1472fa216c2fdc11f615ddb496b2cc","key":1353443288,"value":{"latency":0.31092076301574705921,"where":"hagna","destination":"qmoweb1"}},
        {"id":"bb1472fa216c2fdc11f615ddb496bb73","key":1353443331,"value":{"latency":1.0665589809417723721,"where":"prestonology","destination":"web0"}},
        {"id":"bb1472fa216c2fdc11f615ddb496c3c1","key":1353443336,"value":{"latency":0.97841639518737788528,"where":"prestonology","destination":"web2"}},
        {"id":"bb1472fa216c2fdc11f615ddb496c66e","key":1353443342,"value":{"latency":1.2169909954071045366,"where":"prestonology","destination":"web1"}},
        {"id":"bb1472fa216c2fdc11f615ddb496ca22","key":1353443403,"value":{"latency":0.44436078071594237171,"where":"hagna","destination":"qmoweb0"}},
        {"id":"bb1472fa216c2fdc11f615ddb496cec4","key":1353443408,"value":{"latency":1.0233109951019287998,"where":"hagna","destination":"qmoweb2"}},
        {"id":"bb1472fa216c2fdc11f615ddb496d323","key":1353443417,"value":{"latency":1.7532107830047607422,"where":"hagna","destination":"qmoweb1"}},
        {"id":"bb1472fa216c2fdc11f615ddb496dd0e","key":1353443451,"value":{"latency":1.0710166454315186435,"where":"prestonology","destination":"web0"}},
        {"id":"bb1472fa216c2fdc11f615ddb496e671","key":1353443457,"value":{"latency":1.259017610549926669,"where":"prestonology","destination":"web2"}},
        {"id":"bb1472fa216c2fdc11f615ddb496eacb","key":1353443466,"value":{"latency":1.8100651741027831143,"where":"prestonology","destination":"web1"}},
        {"id":"bb1472fa216c2fdc11f615ddb496f765","key":1353443524,"value":{"latency":0.52074341773986820847,"where":"hagna","destination":"qmoweb0"}},
        {"id":"bb1472fa216c2fdc11f615ddb4970723","key":1353443526,"value":{"latency":0.32633795738220217064,"where":"hagna","destination":"qmoweb2"}}]})

#URL HANDLING
root = Resource()
root.putChild('', MainResource())

js_resource = File('./static/js')
css_resource = File('./static/css')
img_resource = File('./static/img')
template_resource = File('./templates/')

#STATIC STUFF
root.putChild('js', js_resource)
root.putChild('css', css_resource)
root.putChild('img', img_resource)

# JS TEMPLATES
root.putChild('templates', template_resource)

#stuff
root.putChild("menu", MenuItems())
root.putChild("minis", MiniWrap())
root.putChild("servers", MiniWrap())
root.putChild("latency", Latency())

factory = Site(root)
reactor.listenTCP(8990, factory)
reactor.run()

