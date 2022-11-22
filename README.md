curl "https://apscan-proxy.kirisamenana.com/transactions?sender=eq.0xc739507214d0e1bf9795485299d709e00024e92f7c0d055a4c2c39717882bdfd" -i \
 -H "Range-Unit: items" \
 -H "Range: 0-24" > resNew

curl "https://api.apscan.io/transactions?sender=eq.0xc739507214d0e1bf9795485299d709e00024e92f7c0d055a4c2c39717882bdfd" -i \
 -H "Range-Unit: items" \
 -H "Range: 0-24" > old

curl "http://ec2-50-18-35-130.us-west-1.compute.amazonaws.com:3000/transactions?sender=eq.0xc739507214d0e1bf9795485299d709e00024e92f7c0d055a4c2c39717882bdfd" -i \
 -H "Range-Unit: items" \
 -H "Range: 0-24" > new

curl "http://ec2-50-18-35-130.us-west-1.compute.amazonaws.com:3000/blocks" -i \
 -H "Range-Unit: items" \
 -H "Range: 10319775-10319776" > new
