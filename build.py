import os
import os.path
import subprocess
import shutil

shutil.rmtree('dist')
if not os.path.exists('dist'):
    os.mkdir('dist')


label = raw_input('Build label > ')

main_fname = 'compiled.%s.js' % (label, )
main_path = os.path.join('dist', main_fname)
subprocess.check_call(['browserify', '-t', 'babelify', 'src/main.js', '-o', main_path])

worker_fname = 'worker.%s.js' % (label, )
worker_path = os.path.join('dist', worker_fname)
subprocess.check_call(['browserify', '-t', 'babelify', 'src/worker.js', '-o', worker_path])

with open(main_fname, 'w+') as f:
    data = f.read()
    data = data.replace('worker_compiled.js', worker_fname)
    f.write(data)

index_fname = os.path.join('dist', 'index.html')

with open('index.html', 'r') as infile, open(index_fname, 'w') as ofile:
    data = infile.read()
    data = data.replace('compiled.js', main_fname)
    data = data.replace('<title>grinder</title>', '<title>grinder (build %s)</title>' % (label, ))
    ofile.write(data)



files = []
scp_command = ['scp']
scp_command.extend([os.path.join('dist', fname) for fname in os.listdir('dist')])
scp_command.append('asdf@trewq:/var/www/html/wurm/grinder/')
subprocess.check_call(scp_command)
